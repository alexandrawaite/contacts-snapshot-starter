const db = require('./db');

const createUser = function(user) {
  return db.query('INSERT INTO users (first_name, last_name, email, password) VALUES (${first_name}, ${last_name}, ${email}, ${password})',
   user)
   .catch(error => {
    console.error('Error while executing users.create')
    throw error
  })
}

const findUser = function(email) {
  return db.oneOrNone(`SELECT * FROM users WHERE email = $1`, [email])
    .catch(error => {
    console.error('Error while executing users.findUser')
    throw error
  })
}

module.exports = {
  createUser,
  findUser
}
