'use strict';

/**
 * testing-strapi service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::testing-strapi.testing-strapi');
