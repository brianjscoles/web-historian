var http = require("http");
var handler = require("./request-handler");
var archive = require('../helpers/archive-helpers');

var router = {
  '/': true,
  '/loading.html': true
};

var port = 8080;
var ip = "127.0.0.1";
var server = http.createServer(function(req, res) {
  console.log('url: ' + req.url);
  // if (!router[req.url]) {
  //   handler.handleRequest(req, res, 'notFound');
  // } else {
  //   handler.handleRequest(req, res, req.url);
  // }
  handler.handleRequest(req, res, req.url);
});
console.log("Listening on http://" + ip + ":" + port);
archive.initializeStorage();

server.listen(port, ip);

