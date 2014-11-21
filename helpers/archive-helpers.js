var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var httpRequest = require('http-request');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  'siteAssets' : path.join(__dirname, '../web/public'),
  'archivedSites' : path.join(__dirname, '../archives/sites'),
  'list' : path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for jasmine tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readFile = function(address, callback) {
  fs.readFile(address, {encoding: 'utf8'}, callback);
};

exports.writeFile = function(data, address, callback) {
  data = JSON.stringify(data);
  fs.writeFile(address, data, callback);
};

exports.initializeStorage = function() {
  exports.readFile(exports.paths.list, function(err, data) {
    if(data === 'EMPTY\n') {
      var storage = {
        sites: {
          'www.google.com': 'READY'
        },
        queued: []
      };
      exports.writeFile(storage, exports.paths.list, function(err, data) {
        console.log('File Initialized!');
      });
    } else {
      console.log('File Was Already Initialized');
    }

  });
};

exports.readListOfUrls = function(){
};

exports.isUrlInList = function(targetURL, storage){
  return Boolean(storage.sites[targetURL]);
};

exports.addUrlToList = function(targetURL){
  exports.readFile(exports.paths.list, function(err, data) {
    var storage = JSON.parse(data);
    if(!exports.isUrlInList(targetURL, storage)) {
      storage.queued.push(targetURL);
      storage.sites[targetURL] = 'QUEUED';
      console.log('Pushed URL');
    }
    exports.writeFile(storage, exports.paths.list, function(err, data) {
      console.log('URL Added');
    });
  });
};

exports.getURLStatus = function(targetURL, callback){
  exports.readFile(exports.paths.list, function(err, data) {
    var storage = JSON.parse(data);
    callback(targetURL, storage.sites[targetURL]);
  });
};

exports.downloadUrl = function(site){
  httpRequest.get({
    url: site,
    progress: function (current, total) {
      console.log('downloaded' + current + ' ' + total);
    }},
    exports.paths.archivedSites + '/' + site,
    function(err, res) {

      exports.readFile(exports.paths.list, function(err, data) {
        var storage = JSON.parse(data);

        storage.sites[site] = 'READY';
        exports.writeFile(storage, exports.paths.list, function(err, data) {
          console.log('File Written');
        });
      });
    }
  );
};






