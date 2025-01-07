const knex = require("knex");

const knexConfig = require('./knexfile');

// const knexConnect = knex(knexConfig.production);

const environment = 'development';
const config = knexConfig[environment];

const knexConnect = knex(config);

module.exports = knexConnect;