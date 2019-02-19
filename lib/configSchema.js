const Joi = require('joi');

const schema = Joi.object().keys({
  components: Joi.object().pattern(/^/, [
    Joi.object({
      path: Joi.string().required(),
      selector: Joi.string().required(),
      beforeCapture: Joi.func()
    })
  ]),
  sites: Joi.array().required()
});

module.exports = schema;
