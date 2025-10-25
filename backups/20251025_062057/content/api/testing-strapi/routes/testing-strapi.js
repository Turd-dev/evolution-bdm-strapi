'use strict';

/**
 * testing-strapi router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::testing-strapi.testing-strapi');
