const Joi = require('joi');

const validation = {
  create:{
    fullname: Joi.string(),
    username: Joi.string(),
    password: Joi.string(),
    mobile: Joi.string()
  }
};

module.exports = validation;
