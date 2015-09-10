var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var helpers = require('./http-helpers');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  var location = req.url.split('/');
  if(location.length >= 2){
    if(req.method === 'GET'){
      if(location[1] === ''){
        helpers.getFile(res, './public/index.html', 'text/html');
      }
      if(location[1] === 'styles.css'){
        helpers.getFile(res, './public/styles.css', 'text/css');
      }
      if(location[1] === 'app.js'){
        helpers.getFile(res, './public/app.js', 'text/javascript');
      }
      if(location[1] === 'jquery.min.js'){
        helpers.getFile(res, './public/jquery.min.js', 'text/javascript');
      }
    }
  }
  //res.end(archive.paths.list);
};
