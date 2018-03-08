'use strict';

const promise = require('bluebird');
const hapiAuthJwt = require('hapi-auth-jwt2');
var people = { // our "users database"
    1: {
      id: 1,
      name: 'Anthony Valid User'
    }
};

const validate = async function(decode, request) {
  return { isValid: true };
}

const authJwt  = async function authJwtConfig (server) {
  await server.register(hapiAuthJwt);

  await server.auth.strategy('jwt', 'jwt', {
    key: process.env.SECRET,
    validate: async function (decode, request){
      var aba = {isValid:true};
      return aba;
    },
    verifyOptions: { algorithms: [ 'HS256' ] }
  });

  server.auth.default('jwt');

  return server;
}

module.exports = authJwt
