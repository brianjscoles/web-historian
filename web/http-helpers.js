var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};


exports.sendResponse = sendResponse = function(res, statusCode, data, options){
  console.log("sending a response!")
  statusCode = statusCode || 200;
  if(options){
    for(var key in options){
      if(options.hasOwnProperty(key)){
        res.setHeader(key, options[key]);
      }
    }
    res.writeHead(statusCode, headers);
  } else {
  res.writeHead(statusCode, headers);
  }
  if(data) {
    res.end(data);
  } else {
    res.end();
  }
};

exports.serveAssets = function(res, address) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...), css, or anything that doesn't change often.)
  fs.readFile(address, function(err, data) {
    sendResponse(res, 200, data);
  });
};


// As you progress, keep thinking about what helper functions you can put here!
