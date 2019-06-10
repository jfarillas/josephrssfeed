const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.listen(PORT, () => console.log(`Express server currently running on port ${PORT}`));

// create application/json parser
let jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
let urlencodedParser = bodyParser.urlencoded({ extended: false })

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

app.get('/', function(req, res){ 

  request(urls.list, function (error, response, body) {
        
    if (!errResponse(error, response)) {
      /* res.send(`
        <div>
          <h1>RSS Feed Categories</h1>
            <ul>
              <li style="list-style-type:none">Learn about Express routing</li>
              <li style="list-style-type:none">Create my own routes</li>
            </ul>
        </div>
      `); */
      /* for (const [key, value] of body.data.entries(obj)) {
        console.log(key, value);
    } */
      let parseBody = JSON.parse(body);
      let template = `<ul>`;
      Object.keys(parseBody['data'][0]).forEach(key => {
        template += `<li style="list-style-type:none"><a href="/${key}">${parseBody['data'][0][key].title}</a></li>`;
      });
      template += `</ul>`;
      console.log(parseBody['data'][0]);

      res.send(template);
    } else {
        res.send('Something went wrong! Cannot scrape RSS feed categories.');
    }
  });

});

app.get('/'+Object.keys(urls)[1], function(req, res){ 

  request(urls.news, function (error, response, body) {
        
    if (!errResponse(error, response)) {
      let parseBody = JSON.parse(body);
      let template = `<ul>`;
      Object.keys(parseBody['data']).forEach(key => {
        console.log(parseBody['data'][key]);
        //template += `<li style="list-style-type:none"><a href="/${key}">${parseBody['data'][key].title}</a></li>`;
      });
      //template += `</ul>`;
      //console.log(parseBody['data']);
      res.send(body);
    } else {
      res.send('Something went wrong! Cannot scrape '+capitalise(Object.keys(urls)[1])+' RSS feed.');
    }
  });

});

app.get('/'+Object.keys(urls)[2], function(req, res){ 

  request(urls.sport, function (error, response, body) {
        
    if (!errResponse(error, response)) {
      res.send(body);
    } else {
      res.send('Something went wrong! Cannot scrape '+capitalise(Object.keys(urls)[2])+' RSS feed.');
    }
  });

});

app.get('/'+Object.keys(urls)[3], function(req, res){ 

  request(urls.business, function (error, response, body) {
        
    if (!errResponse(error, response)) {
      res.send(body);
    } else {
      res.send('Something went wrong! Cannot scrape '+capitalise(Object.keys(urls)[3])+' RSS feed.');
    }
  });

});

app.get('/'+Object.keys(urls)[4], function(req, res){ 

  request(urls.entertainment, function (error, response, body) {
        
    if (!errResponse(error, response)) {
      res.send(body);
    } else {
      res.send('Something went wrong! Cannot scrape '+capitalise(Object.keys(urls)[4])+' RSS feed.');
    }
  });

});
