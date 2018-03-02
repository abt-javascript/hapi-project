'use strict';
const controller = require('./controller');
const validation = require('./validation');

module.exports = [{
	method: 'get',
	path: '/user',
	handler: controller.list
}, {
	method: 'post',
	path: '/user/sign_up',
	handler: controller.sign_up,
	config:{
		validate: {
			payload: validation.create
		}
	}
}];
