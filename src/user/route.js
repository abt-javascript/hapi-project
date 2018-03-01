'use strict';
const controller = require('./controller');

module.exports = [{
	method: 'GET',
	path: '/user',
	handler: controller.list
}, {
	method: 'POST',
	path: '/user/sign_up',
	handler: controller.sign_up
}];
