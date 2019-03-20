const fetch = require('node-fetch');

const db = require('../db');

const Search = {};
module.exports = Search;

Search.lookup = (req) => {
  const { term } = req.query;

  db.any(`
    UPDATE searches
    SET count = count + 1
    WHERE term = $1
    RETURNING count
  `, term)
    .then((result) => {
      if (result.length === 0) {
        db.none(`
          INSERT INTO searches
            (term, count)
          VALUES
            ($1, 1)
        `, term)
          .catch(console.error);
      }
    })
    .catch(console.error);

  return fetch(`https://en.wikipedia.org/w/api.php?action=opensearch&search=${term}`)
    .then(res => res.json())
    .catch(console.error);
};

Search.report = () => db.any('SELECT * FROM searches')
  .catch(console.error);
