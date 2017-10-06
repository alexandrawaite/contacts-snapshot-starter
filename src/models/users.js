const bcrypt = require('bcrypt');
const db = require('./db/users');

const encryptPassword = (password) => {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds)
};

const create = (user) => {
  return encryptPassword(user.password)
  .then((hash) => {
    user.password = hash;
    return db.createUser(user)
  })
  .catch(error => {
    console.log('Error while executing create encryptPassword')
  })
};

const verifyUser = (email, password) => {
  return db.findUser(email)
  .then((validEmail) => {
    if (validEmail) {
      return bcrypt.compare(password, validEmail.password)
      .then((validPassword) => {
        if (validPassword) {
          return validEmail.id; //for session to login the user
        } else if (!validPassword) {
          throw new Error('Invalid Username/Password');
        }
      })
    } else if (!validEmail) {
      throw new Error('Invalid Username/Password');
    }
  })
  .catch(error => {
    console.log('Error!', error);
  })
}

module.exports = {
  create,
  encryptPassword,
  verifyUser
}
