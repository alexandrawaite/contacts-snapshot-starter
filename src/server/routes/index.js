const router = require('express').Router();
const contactsRoutes = require('./contacts')
const users = require('../../models/users')
const contacts = require('../../models/contacts');
const middlewares = require('../middlewares');

router.get('/', middlewares.sessionChecker, (request, response, next) => {

  contacts.findAll()
  .then((contacts) => {
    response.render('contacts/index', {contacts})
  })
  .catch(error => next(error))
})

router.get('/signup', (request, response) => {
  response.render('users/signup')
})

router.post('/signup', (request, response) => {
  users.create(request.body)
  .then(() => {
    response.redirect('/')
  })
  .catch(error => next(error))
})

router.get('/login', (request, response) => {
  response.render('users/login', {error: false})
})

router.post('/login', (request, response) => {
  const {email, password} = request.body;
  users.verifyUser(email, password)
  .then((userId) => {
    console.log("user::::", userId);
    if (!userId) {
      const error = 'Invalid Username or Password'
      response.render('users/login', {error: error});
    } else {
      request.session.user = userId;
      response.redirect('/')
    }
  })
  .catch(error => {
    console.log('Error while executing login', error);
  })
})

router.use('/contacts', middlewares.sessionChecker, contactsRoutes);

router.use(middlewares.logErrors);
router.use(middlewares.errorHandler);
router.use(middlewares.notFoundHandler)

module.exports = router;
