const auth = require('../../auth')

module.exports = function checkAuth(action) {

  function middleware(req, res, next) {
    const owner = req.body.ci || req.params.ci
    
    // const checking = {
    //   'update': auth.check.own(req, owner),
    //   'desactivate': auth.check.own(req, owner),
    //   'cart': auth.check.own(req, owner),
    //   'bills': auth.check.own(req, owner)
    // }

    switch (action) {
      case 'CREATE':

        auth.check.own(req, owner, action)

        next()
      break

      case 'UPDATE':

        auth.check.own(req, owner, action)

        next()
      break

      case 'DESACTIVATE':
        auth.check.own(req, res, owner, action)

        next()
      break

      case 'REMOVE':
        auth.check.own(req, owner, action)
      
        next()
      break

      case 'cart':
        auth.check.own(req, res, owner, action)

        next()
      break

      case 'bills':
        auth.check.own(req, res, owner)

        next()
      break

      default:
        next()
    }
  }

  return middleware
}