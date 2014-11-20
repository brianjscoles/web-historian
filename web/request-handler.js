var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers');
// require more modules/folders here!

exports.handleRequest = function (req, res, resource) {
  if (resource === '/') {
    var address = path.join(__dirname, '/public/index.html');
    httpHelpers.serveAssets(res, address, function() {
      console.log('asset served!');
    });
  } else {
    httpHelpers.sendResponse(res);
  }

};
