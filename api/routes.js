const auth = require('./components/auth/network')
const users = require('./components/users/network')
const articles = require('./components/articles/network')
const clients = require('./components/clients/network')
const cart = require('./components/cart/network')

// const errors = require('./errors')

const routes = (app) => {
  app.use('/api/auth', auth)
  app.use('/api/users', users)
  app.use('/api/articles', articles)
  app.use('/api/clients', clients)
  app.use('/api/cart', cart)

  // app.use(errors)
}

module.exports = routes