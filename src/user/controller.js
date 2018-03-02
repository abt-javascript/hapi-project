'use strict';
const userModel = require('./model');
const promise = require('bluebird');

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
	sign_up: function(req, h) {
		let payload = req.payload;
		payload.created = new Date();

		return new promise((resolve, reject) => {
			userModel.create(payload, (err, ok) => {
				if(!err) {
					return resolve(ok)
				}

				return reject(err);
			});
		});
	}
};

module.exports = user;
