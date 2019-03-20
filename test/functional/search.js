const { expect } = require('code');

const server = require('../../app.js');
const db = require('../../db');

exports.lab = require('lab').script();

const { it } = exports.lab;

const rand = Math.random().toString(36).substring(2, 15);

// Test search
it('returns 200 and result array', () => server.then(serv => serv.inject({
  method: 'GET',
  url: '/search?term=system of a down awards',
}))
  .then((res) => {
    expect(res.statusCode).to.equal(200);
    expect(res.result).to.equal(['system of a down awards',
      ['System of a down awards and nominations'],
      [''],
      ['https://en.wikipedia.org/wiki/System_of_a_down_awards_and_nominations']]);
  }));

// Test search counting
it('returns adds the search entry to database', () => server.then(serv => serv.inject({
  method: 'GET',
  url: `/search?term=${rand}`,
}))
  .then(() => db.one(`
    SELECT count
    FROM searches
    WHERE term = $1
  `, rand))
  .then((res) => {
    expect(res.count).to.equal(1);
  }));

it('returns adds the search entry to database', () => server.then(serv => serv.inject({
  method: 'GET',
  url: `/search?term=${rand}`,
}))
  .then(() => db.one(`
    SELECT count
    FROM searches
    WHERE term = $1
  `, rand))
  .then((res) => {
    expect(res.count).to.equal(2);
  }));
