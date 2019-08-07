const express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const routes = require('./api/routes/weather'); 
routes(app);

app.listen(port);

console.log('server started on: ' + port);

// 404 handler
app.use(function(req, res) {
    res.status(404).send({error: req.originalUrl + ' 404 (not found)'})
  });

  // error handler
app.use(function (err, req, res, next) {
  let status = err.status;
  if(typeof err.response != 'undefined'){
    status = err.response.status
  }

  res.status(status || 500);
  res.json({error: err.message});
});