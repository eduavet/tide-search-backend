const Promise = require('promise');
const Pg = require('pg-promise');

const { env } = process;

const db = Pg({ promiseLib: Promise })(`postgres://${env.POSTGRES_USER}:${env.POSTGRES_PASS}@${env.POSTGRES_HOST}/${env.POSTGRES_DB}`);

module.exports = db;
