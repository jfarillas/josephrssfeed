const express = require('express');

const app = express();
const PORT = 3000;

app.listen(PORT, () => console.log(`Express server currently running on port ${PORT}`));

app.get(`/`, (request, response, next) => {
    request.get("http://rssfeeds.local/api/list", (err, response, body) => {
        if (err) {
            return next(err);
        }
        response.render("template", {data: JSON.parse(body)});
    });
});


