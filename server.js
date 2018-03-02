'use strict';

const Hapi = require('hapi');
const routes = require('./config/routes.js')();
const server = new Hapi.Server({port:1200});
require('dotenv').config();
let mongoose = require('./config/connections.js').connection;

mongoose.on('error', console.error.bind(console, 'connection error:'));

mongoose.once('open', function() {
  console.log("mongodb ready !");
});

async function start(){
  try {
     await routes.map((item) => {
       server.route(item);
    });

    await server.start();
  } catch (err) {
    throw err;
  }
}

start();

module.exports.server = server;
console.log(`Server running at: ${server.info.uri}`)
