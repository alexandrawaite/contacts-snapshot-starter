const db = require('./db');

const create = function(user) {
  return db.query(`
    INSERT INTO
      users (first_name, last_name, email, password)
    VALUES
      ($1::text, $2::text, $3::text, $4::text)
  `)
}