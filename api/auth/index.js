const jwt = require('jsonwebtoken')

const config = require('../config')
const error = require('../utils/error')

const secret = config.jwt.secret

function sign(data) {

  return jwt.sign(data, secret)

}

function verify(token) {

  let decoded = jwt.verify(token, secret)

  return decoded

}

const check = {

  own: (req, owner, action) => {
    
    const decoded = decodeHeader(req)

    console.log(`[AUTH]: User (${decoded.ci}) trying ${action} user (${owner})...`)
    
    if (decoded.level >= 3 && decoded.ci !== owner) {

      throw error(`[UNAUTHORIZED]: User (${decoded.ci}), pivileges (${decoded.level}) cannot ${action} users.`, 401)

    }
  }
}

function getToken(auth) {

  if (!auth) {

    throw error('No se encontro ningun token', 400)

  }

  if (auth.indexOf('Bearer ') === -1) {
    
    throw error('El formato del token es invalido', 400)

  }

  let token = auth.replace('Bearer ', '')

  return token

}

function decodeHeader(req) {
  
  const authorization = req.headers.authorization
  const token = getToken(authorization)
  const decoded = verify(token)

  // req.user = decoded

  return decoded
  
}

module.exports = {
  sign,
  check,
}