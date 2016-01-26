'use strict';

const hapi = require('hapi');

const server = new hapi.Server();

server.connection({
	port: process.env.PORT || 6234
});

server.register(require('inert'), (err) => {
  if (err) {
    throw err;
  }

  server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
    	console.log(11)
      reply.file('target/index.html');
    }
  });

  server.start((err)=> {
  	if(err) {
  		throw err;
  	}
		console.log('Server running at: ', server.info.uri);
	});
});
