var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var request = require('request');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
};

exports.statusCode = statusCode = 200;

exports.serveAssets = serveAssets = function(res, asset, contentType) {
  headers['Content-type'] = contentType;
  res.writeHead(statusCode, headers);
  res.end(asset);
};

exports.serveRedirect = serveRedirect = function(res, url) {
  // headers["Location"] = url;
  // console.log('redirecting...');
  // res.statusCode = 302;
  // res.setHeader('Location', url);
  res.writeHead(302, {Location: url});
  res.end();
};

exports.getFile = getFile = function(res, file, contentType) {
  fs.readFile(file, 'utf-8', function(err, data) {
    console.log('file: ', file);
    if (err) {
      throw 'file not loaded';
    } else {
      serveAssets(res, data, contentType);
    }
  });
};

exports.processPost = processPost = function(req, res) {
  var site = '';
  req.on('data', function(chunk) {
    site += chunk;
  });
  req.on('end', function() {
    readListOfUrls(JSON.parse(site), res);
  });
};

exports.addUrlToList = addUrlToList = function(site, res) {
  fs.appendFile('./archives/sites.txt', site + '\n', function(err) {
    if (err) {
      throw 'site not added to index';
    } else {
      serveRedirect(res, '/loading.html');
    }
  });
}; 

exports.readListOfUrls = readListOfUrls = function(site, res){
  fs.readFile('./archives/sites.txt', 'utf-8', function(err, data){
    if(err){
      throw "Cannot read list of URLs";
    } else {
      isUrlInList(data, site, res);
    }
  });
};

exports.isUrlInList = isUrlInList = function(data, site, res){
  listOfSites = data.split('\n');
  if (listOfSites.indexOf(site) >= 0) {
    var site = './archives/sites/' + site + '.html';
    serveRedirect(res, site);
    console.log('site found');
  } else {
    addUrlToList(site, res);
  }
};

exports.downloadUrls = downloadUrls = function(url){
  url = JSON.parse(url);
  var site = 'http://' + url;
  request(site, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var fileLocation = './archives/sites/' + url + '.html';
      fs.writeFile(fileLocation, body, 'utf-8', 
        function(err) {
        if (err) {
          throw 'url not written to file';
        }
      }); 
    }
  });
};

// As you progress, keep thinking about what helper functions you can put here!
