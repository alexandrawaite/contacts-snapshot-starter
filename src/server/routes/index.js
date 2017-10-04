const users = require('../../models/users')
const router = require('express').Router();
const contactsRoutes = require('./contacts')
const contacts = require('../../models/contacts');
const middlewares = require('../middlewares');

router.get('/', (request, response, next) => {

  contacts.findAll()
    .then((contacts) => {response.render('contacts/index', { contacts })})
    .catch( error => next(error) )
})

router.get('/signup', (request, response) => {
  response.render('users/signup')
})

router.post('/', (request, response, next) => {
  users.create(request.body)
  .then(function(user) {
    if (user) return response.redirect('/')
    next()
  })
  .catch( error => next(error) )
})

router.get('/login', (request, response) => {
  response.render('users/login')
})

router.use('/contacts', contactsRoutes);

router.use(middlewares.logErrors);
router.use(middlewares.errorHandler);
router.use(middlewares.notFoundHandler)

module.exports = router;
