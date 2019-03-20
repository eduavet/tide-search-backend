const Joi = require('joi');
const Boom = require('boom');

const Search = require('../handlers/search');

const routes = [];

const validationError = async (request, h, err) => Boom.badRequest(err.details[0].message);

routes.push({
  method: 'GET',
  path: '/search',
  config: {
    handler: Search.lookup,
    validate: {
      query: {
        term: Joi.string().required(),
      },
      failAction: validationError,
    },
    response: {
      schema: Joi.array(),
      failAction: validationError,
    },
  },
});

routes.push({
  method: 'GET',
  path: '/report',
  config: {
    handler: Search.report,
    response: {
      schema: Joi.array(),
      failAction: validationError,
    },
  },
});

module.exports = routes;
