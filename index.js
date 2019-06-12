const express = require('express');
const request = require('request');
var cors = require('cors');

const app = express();
const PORT = 3000;

app.listen(PORT, () => console.log(`Express server currently running on port ${PORT}`));

app.use(cors());
app.use(express.static(__dirname + '/'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

function errResponse(err, res) 
{
  if (err || res !== 200) {
      // Print the error if one occurred and handle it
      console.log('error:', err); 
      // Print the response status code if a response was received
      console.log('statusCode:', res && res.statusCode);
      return false;
  } else {
      // Print the response status code if a response was received
      console.log('statusCode:', res && res.statusCode);
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
  'list': 'https://rssfeeds.jfarillas.com/api/list',
  'news': 'https://rssfeeds.jfarillas.com/api/list/news',
  'sport': 'https://rssfeeds.jfarillas.com/api/list/sport',
  'business': 'https://rssfeeds.jfarillas.com/api/list/business',
  'entertainment': 'https://rssfeeds.jfarillas.com/api/list/entertainment' 
};

// Capitalise first letter
const capitalise = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

app.get('/list', function(req, res){ 
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
});

app.get('/:category', function(req, res){ 
  let category = req.params.category;
  console.log(category);
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
});