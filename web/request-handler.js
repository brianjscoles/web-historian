var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers');
// require more modules/folders here!

exports.handleRequest = function (req, res, resource) {
  var parsedURL = resource.split('/');
  var action = parsedURL[1];
  var targetURL = parsedURL.slice(2).join('/');

  if(action === 'save') {
    archive.addUrlToList(targetURL);
  } else if (action === 'see') {
      archive.getURLStatus(targetURL, function(targetURL, status) {
        if(status === 'READY') {
         var redirectURL = 'http://127.0.0.1:8080/sites/' + targetURL;
          httpHelpers.sendResponse(res, 200, redirectURL);
        } else if (status === 'QUEUED' || status === 'LOADING') {
          var address = path.join(__dirname, '/public/loading.html');
          httpHelpers.sendResponse(res, address, function() {
            console.log('asset served!');
          });
        } else {
          httpHelpers.sendResponse(res, 404);
        }
      });

  } else if (action === "sites") {
    console.log("ooh look a sites request!")
    httpHelpers.serveAssets(res,path.join(__dirname, '../archives/sites/', targetURL));
      //127.0.0.1:8080/sites/www.google.com
  } else if (resource === '/') {
    var address = path.join(__dirname, '/public/index.html');
    httpHelpers.serveAssets(res, address, function() {
      console.log('asset served!');
    });
  } else {
    httpHelpers.sendResponse(res);
  }

};
