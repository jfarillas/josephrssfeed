const express = require('express');
const request = require('request');
const cors = require('cors');
const fs = require('fs');
const https = require('https');
const config = require('./config.json');

const app = express();
//const PORT = 3000;

//app.listen(PORT, () => console.log(`Express server currently running on port ${PORT}`));

app.use(cors());
app.use(express.static(__dirname + '/'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

function errResponse(err, res) 
{
  if (err || res !== 200) {
      return false;
  } else {
      return true;
  }
}

function templateDetails(body)
{
  let parseBody = JSON.parse(body);
  let data = {};
  let headerTitle = {};
  let getItems = {};
  headerTitle['permalink'] = parseBody['data'][0].permalink;
  headerTitle['title'] = parseBody['data'][0].title;
  Object.keys(parseBody['data'][0]).forEach(key => {
    if (parseBody['data'][0][key] instanceof Array) {
      Object.keys(parseBody['data'][0][key]).forEach(subKey => {
        getItems[subKey] = parseBody['data'][0][key][subKey];
      });
    }
  });
  data['headerTitle'] = headerTitle;
  data['getItems'] = getItems;
  return data;
}

function requestContent(catUrl, category, res)
{
  request(catUrl, function (error, response, body) {
    if (!errResponse(error, response)) {
      let rs = templateDetails(body);
      let headerTitle = rs.headerTitle;
      let getItems = rs.getItems;
      res.send(rs);
    } else {
      res.send('Something went wrong! Cannot scrape '+capitalise(category)+' RSS feed.');
    }
  });
}

let urls = {
  'list': config.hostname+'/api/v1/list',
  'news': config.hostname+'/api/v1/list/news',
  'sport': config.hostname+'/api/v1/list/sport',
  'business': config.hostname+'/api/v1/list/business',
  'entertainment': config.hostname+'/api/v1/list/entertainment' 
};

// Capitalise first letter
const capitalise = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

app.get('*/list', function(req, res){ 
  if (req.secure) {
    request(urls.list, function (error, response, body) {
      if (!errResponse(error, response)) {
         let parseBody = JSON.parse(body);
         let data = {};
         Object.keys(parseBody['data'][0]).forEach(key => {
           data[key] = parseBody['data'][0][key].title;
         });
         res.send(data);
      } else {
        res.send('Something went wrong! Cannot scrape RSS feed categories.');
      }
    });	  
  } else {
    res.redirect(301, 'https://localhost:3000/list');
  }
});

app.get('*/:category', function(req, res){
  let category = req.params.category;	
  if (req.secure) {
    switch (category) {
      case 'news':
        requestContent(urls.news, category, res);
      break;
      case 'sport':
        requestContent(urls.sport, category, res);
      break;
      case 'business':
        requestContent(urls.business, category, res);
      break;
      case 'entertainment':
        requestContent(urls.entertainment, category, res);
      break;
    }
  } else {
    res.redirect(301, 'https://localhost:3000/'+category);
  }
});

https.createServer({
  key: fs.readFileSync('/home/jfarillas/localhost+2-key.pem'),
  cert: fs.readFileSync('/home/jfarillas/localhost+2.pem')
}, app).listen(3000, '0.0.0.0', () => {
  console.log('Listening...')
});
