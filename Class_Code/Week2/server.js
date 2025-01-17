const http = require('http');

const app = http.createServer((req, res) => {

  if (req.url == "/") {

    res.end("hello from home");

  } else if (req.url === "/details") {

    res.end("hello from details");

  } else if (req.url === "/login") {

    res.end("");

  } else {

    res.end("page not found");

  }

});



app.listen(8000, () => {

});