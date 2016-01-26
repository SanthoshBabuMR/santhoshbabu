'use strict';

const hapi = require('hapi');

const server = new hapi.Server();

server.connection({
	port: process.env.PORT || 5000
});

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply('Hello, world!');
    }
});

server.start(()=> {
	console.log('Server running at: ', server.info.uri);
});
