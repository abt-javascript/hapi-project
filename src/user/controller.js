'use strict';
const userModel = require('./model');
const promise = require('bluebird');
const bcrypt = require('bcrypt');

var user = {
	list: function(request, h) {
		return new promise((resolve, reject) => {
			userModel.find().exec((err, users) =>{
				if(!err){
					return resolve(users);
				}

				return reject(err);
			});
		});
	},
	sign_up: async function(req, h) {
		let payload = req.payload;
		payload.created = new Date();

		let createUser =  await new promise((resolve, reject) => {
			bcrypt.genSalt(10, function(err, salt) {
			  bcrypt.hash(payload.password, salt, function(err, hash) {
			      payload.password = hash;

						userModel.create(payload, (err, ok) => {
							if(!err) {
								resolve(ok);
							}

							if(err && err.code === 11000){
								resolve('duplicate payload');
							}

							reject(err);
						});
			  });
			});
		});

		return h.response(createUser);
	},
	sign_in: async function(req, h) {
		let payload = req.payload;
		payload.created = new Date();

		let user =  await new promise((resolve, reject) => {
			userModel.findOne({username:payload.username}, (err, ok) => {
				if(!err && ok) {
					resolve(ok);
				}

				if(!ok){
					resolve('Data not match');
				}

				reject(err);
			});
		});

		return h.response(user);
	}
};

module.exports = user;
