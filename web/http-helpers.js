var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
};

exports.statusCode = statusCode = 200;

exports.serveAssets = serveAssets = function(res, asset, contentType) {
  this.headers['Content-type'] = contentType;
  res.writeHead(statusCode, headers);
  res.end(asset);
};

exports.getFile = getFile = function(res, file, contentType) {
  fs.readFile(file, 'utf-8', function(err, data) {
    if (err) {
      throw 'file not loaded';
    } else {
      serveAssets(res, data, contentType);
    }
  });
};

// As you progress, keep thinking about what helper functions you can put here!
