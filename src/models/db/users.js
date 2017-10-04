const db = require('./db');

const createUser = function(user) {
  return db.query('INSERT INTO users (first_name, last_name, email, password) VALUES (${first_name}, ${last_name}, ${email}, ${password})', user)
  .catch( error => {
    console.error('Error while executing users.create')
    throw error
  })
}

module.exports = {
  createUser
}
