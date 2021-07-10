const router = require('express').Router()

const Controller = require('./index')
const response = require('../../utils/response')

router.post('/login', async (req, res, next) => {

  try {

      const token = await Controller.login(req.body.ci, req.body.password)
    
      if (token) {

        response.success(req, res, 200,
          token, 
          'Login exitoso!',
          `USERS: USER (${req.body.ci}) LOGGED.`)

      } else if (token === null) {

        response.error(req, res, 400,
          'Las credenciales ingresadas son invalidas.', 
          'Credenciales invalidas.',
          `AUTH_NETWORK: INVALID CREDENTIALS.`)

      }
    
      } catch(error) {

      response.error(req, res, 500,
        'No pudimos procesar tu solicitud.', 
        'Error interno.', 
        `[SERVER_ERROR]: ${error}`)

    }
})

module.exports = router