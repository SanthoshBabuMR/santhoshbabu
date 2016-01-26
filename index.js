'use strict';

const Path    = require('path');
const Hapi    = require('hapi');
const Inert   = require('inert');

const Server  = new Hapi.Server({
  connections: {
    routes: {
      files: {
        relativeTo: Path.join(__dirname, 'target/public')
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
Server.route({
  method: 'GET',
  path: '/{param*}',
  handler: {
    directory: {
      path: '.',
      redirectToSlash: true,
      index: true
    }
  }
});

// start server
Server.start((err)=> {
	if(err) {
		throw err;
	}
	console.log('Server running at: ', Server.info.uri);
});
