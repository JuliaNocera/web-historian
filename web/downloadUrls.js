var fs = require('fs');
var helpers = require('./http-helpers');
var request = require('request');


var readEachSiteFromList = function(){
  fs.readFile('./archives/sites.txt', 'utf-8', function(err, data){
    if(err){
      throw 'Cannot read list of URLs';
    } else {
      var sites = data.split('\n');
      for(var i = 0; i < sites.length-1; i++){
        helpers.downloadUrls(sites[i]);
      }
    }
  });
};

readEachSiteFromList();
