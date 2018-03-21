'use strict';

const Hapi = require('hapi');
const routes = require('./config/routes.js')();
const server = new Hapi.Server({port:1200});
const authJwt = require('./config/auth-jwt.js');
const cron = require('./config/cron.js');

require('dotenv').config();

let mongoose = require('./config/connections.js').connection;

mongoose.on('error', console.error.bind(console, 'connection error:'));

mongoose.once('open', function() {
  console.log("mongodb ready !");
});

const init = async () => {
  await authJwt(server);

  await routes.map((item) => {
    server.route(item);
  });

  await server.start();

  return server;
}

init().then(server => {
  cron();
  console.log(`Server running at: ${server.info.uri}`)
}).catch(error => {
  console.log(error);
});
