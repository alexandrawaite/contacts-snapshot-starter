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

router.post('/signup', (request, response) => {
  users.create(request.body)
  .then(function(user) {
    if (user) return response.redirect('/')
  })
  .catch( error => next(error) )
})

router.get('/login', (request, response) => {
  response.render('users/login', {error: false})
})

router.post('/login', (request, response) => {
  const { email, password } = request.body;
  users.verifyUser(email, password)
  .then( (userId) =>{
    if (!userId) {
      const error = 'Invalid Username or Password'
      response.render('users/login', { error: error });
    } else {
      request.session.user = userId;
    response.redirect('/')
    }
  })
  .catch( error =>{
    console.log('Error while executing login', error);
  })
})

router.use('/contacts', contactsRoutes);

router.use(middlewares.logErrors);
router.use(middlewares.errorHandler);
router.use(middlewares.notFoundHandler)

module.exports = router;
