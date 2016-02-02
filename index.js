'use strict';

const URL     = require('url');
const Path    = require('path');
const Hapi    = require('hapi');
const Inert   = require('inert');

const Server  = new Hapi.Server({
  connections: {
    routes: {
      files: {
        relativeTo: Path.join(__dirname, 'target/public/')
      }
    }
  }
});

Server.connection({
	port: process.env.PORT || 6234
});

Server.register(Inert, (err)=> {
  if(err) {
    throw err;
  }
});

// configure routes
Server.route([
  {
    method: 'GET',
    path: '/{file*}',
    handler: {
      file:  function(request) {
        var file = request.params.file,
            path = '',
            fileType = file? Path.extname(URL.parse(file).pathname) : undefined;
        if(!file) {
          path += 'views/index.html';
        }
        else if(!fileType) {
          file += (file[file.length-1] !== '/')? '/' : '';
          path += 'views/' + file + 'index.html';
        }
        else if(fileType.toLowerCase() === '.html') {
          path += 'views/' + file;
        }
        else {
          path += file;
        }
        //console.log('file requested : ' + file);
        //console.log('file type      : ' + fileType);
        //console.log('file path      : ' + path);
        //console.log('---');
        return path;
      }
    }
  }
]);

// start server
Server.start((err)=> {
	if(err) {
		throw err;
	}
	console.log('Server running at: ', Server.info.uri);
});
