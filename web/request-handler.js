var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var helpers = require('./http-helpers');

exports.handleRequest = function (req, res) {
  if(req.method === 'GET'){
    if(req.url === '/'){
      helpers.getFile(res, './public/index.html', 'text/html');
    } else {
      var extension = req.url.split('.');
      var path = './public' + req.url;
      console.log('path:', path);
      helpers.getFile(res, path, 'text/' + extension[extension.length - 1]);
    }
  }  
  if (req.method === 'POST') {
    helpers.processPost(req, res);
  } 
};
