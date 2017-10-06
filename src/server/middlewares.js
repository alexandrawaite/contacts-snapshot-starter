const errorHandler = (error, request, response, next) => {
  response.status(500).send('Something bad happened. This page should be nicer looking');
};

const logErrors = (error, request, response, next) => {
  console.error(error.stack)
  next(error);
};

const notFoundHandler = (request, response) => {
  response.status(404).render('common/not_found', {name: 'Foobar'})
}

const setDefaultResponseLocals = (request, response, next) => {
  response.locals.query = ''
  next()
}

const sessionChecker = (request, response, next) => {
  if (!(request.session.user && request.cookie.user_sid)) {
    response.redirect('/login')
  } else {
    next()
  }
}

module.exports = {
  errorHandler,
  logErrors,
  notFoundHandler,
  setDefaultResponseLocals,
  sessionChecker
};
