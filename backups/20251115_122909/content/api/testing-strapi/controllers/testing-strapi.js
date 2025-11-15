'use strict';

/**
 * testing-strapi controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::testing-strapi.testing-strapi');
