// eventually, you'll have some code here that uses the code in `archive-helpers.js`
// to actually download the urls you want to download.

// CRONTAB SETUP: in terminal:
// "crontab -e"
// */1 * * * * export NODE_PATH=/Users/student/.nvm/v0.10.26/lib/node_modules/ /Users/student/.nvm/v0.10.26/bin/node /Users/student/Desktop/2014-10-web-historian/workers/htmlfetcher.js


var path = require('path');
var archive = require(path.join(__dirname, '../helpers/archive-helpers'));


archive.readFile(archive.paths.list, function(err, data) {
  var storage = JSON.parse(data);

  if(storage.queued.length > 0) {
    var site = storage.queued.shift();
    archive.downloadUrl(site);
    storage.sites[site] = 'LOADING';
    archive.writeFile(storage, archive.paths.list, function(err, data) {
      console.log('File Written');
    });
  }
});
