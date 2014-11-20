var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers');
// require more modules/folders here!

exports.handleRequest = function (req, res, resource) {
  var parsedURL = resource.split('/');
  var action = parsedURL[1];
  var targetURL = parsedURL.slice(2).join('/');

  if(action === 'save') {
    //write to file
    httpHelpers.addUrlToList(targetURL);
    //redirect loading.html
  } else if (action === 'see') {

  } else if (resource === '/') {
    var address = path.join(__dirname, '/public/index.html');
    httpHelpers.serveAssets(res, address, function() {
      console.log('asset served!');
    });
  } else {
    httpHelpers.sendResponse(res);
  }

};
