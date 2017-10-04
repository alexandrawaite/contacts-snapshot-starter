const bcrypt = require('bcrypt');
const db = require('./db/users');

const encryptedPassword = (password) => {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds)
};

const comparedPassword = (plainPassword, hash) => {
  return bcrypt.compare(plainPassword, hash)
};

const create = (user) => {
  const { first_name, last_name, email, password } = user
  return encryptedPassword(password)
  .then((hash) => {
    user.password = hash;
    return db.createUser(user)
  })
  .catch( error => {
    console.log('Error while executing create encryptedPassword')
  })
};

module.exports = {
  create,
  encryptedPassword,
  comparedPassword,
}
