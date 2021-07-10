const router = require('express').Router()

const secure = require('./secure')
const Controller = require('./index')
const response = require('../../utils/response')

// ROUTES
router.get('/', list)
router.get('/:ci', get)
router.post('/', secure('CREATE'), upsert)
router.put('/', secure('UPDATE'), upsert)
router.delete('/:ci', secure('REMOVE'), remove)

// USER FUNCTIONS
async function list(req, res, next) {

  try {

    const list = await Controller.list()

    if (list) {

      response.success(req, res, 200,
        list,
        'Lista encontrada!',
        'USERS: LIST SENT.')

    }

  } catch(error) {
    
    response.error(req, res, 500,
      'No pudimos procesar tu solicitud.',
      'Error interno.',
      `USERS_NETWORK: ${error}`)
  }
}

async function get(req, res, next) {

  try {

    const user = await Controller.get(req.params.ci)

    if (user) {

      response.success(req, res, 200,
        user, 
        'Usuario encontrado!',
        `USERS: USER (${user.ci}) FOUND.`)

    } else if (user === null) {

      response.error(req, res, 404,
        'El usuario que esta buscando no se encuentra registrado.', 
        'Usuario no encontrado!',
        `USERS_NETWORK: User (${req.params.ci}) not registered.`)

    }

  } catch(error) {
    
    response.error(req, res, 500,
      'No pudimos procesar tu solicitud.', 
    'Error interno.', 
    `[SERVER_ERROR]: ${error}`)

  }
}

async function upsert(req, res) {
  
  body.id = req.params.id
  
  try {
    
    const user = await Controller.upsert(req.body)
    
    if (user && !req.body.ci) {
      
      response.success(req, res, 200,
        user,
        'Usuario modificado!',
        `USERS: (${user.ci}) MODIFIED.`)

    } else if (user === null) {
      
      response.error(req, res, 400,
        'Debe completar la información.',
        'Informacion incompleta.',
        `USERS_NETWORK: Not enough data to create user (${req.body.ci}).`)

    } else if (user.code === 11000) {

      response.error(req, res, 400,
        'La identificacion ingresada ya esta registrada.',
        'Identificacion duplicada.',
        `USERS_NETWORK: User CI (${req.body.ci}) is already registered.`)
      
    } else if (user.errors) {

      if (user.errors.ci) {

        if (user.errors.ci.kind === 'Number') {

          response.error(req, res, 400,
            'El tipo de dato ingresado en CI no corresponde.',
            'Tipo de dato no valido.',
            `USERS_NETWORK: ${user.errors.ci.message}`)

        } else if (user.errors.ci.kind === 'min' || user.errors.ci.kind === 'max') {

          response.error(req, res, 400,
            'El valor ingresado no cumple los requisitos de longitud.',
            'Datos fuera de parametros.',
            `USERS_NETWORK: ${user.errors.ci.properties.message}`)

        }

      } else if (user.errors.level) {

        if (user.errors.level.kind === 'Number') {

          response.error(req, res, 400,
            'El tipo de dato ingresado en Nivel no corresponde.',
            'Tipo de dato no valido.',
            `USERS_NETWORK: ${user.errors.level.message}`)

        } else if (user.errors.level.kind === 'enum') {

          response.error(req, res, 400,
            'El numero ingresado en Nivel no esta dentro de los parametros',
            'Datos fuera de parametros.',
            `USERS_NETWORK: ${user.errors.level.properties.message}`)

        }

      } else if (user.errors.salary) {

        response.error(req, res, 400,
          'El tipo de dato ingresado en Salario no corresponde.',
          'Tipo de dato no valido.',
          `USERS_NETWORK: ${user.errors.salary.message}`)

      }

    } else {
      
      response.success(req, res, 200,
        user,
        'Usuario creado!',
        `USERS: (${user.ci}) CREATED WITH LEVEL (${user.level}) PRIVILEGES.`)

    }

  } catch (error) {
    
    response.error(req, res, 500,
      'No pudimos procesar tu solicitud.',
      'Error interno.',
      `USERS_NETWORK: ${error}`)
    
  }
}

async function remove(req, res, next) {
  
  try {

    const user = await Controller.remove(req.params.ci)
    
    if (user) {

      response.success(req, res, 200,
        user, 
        'Usuario eliminado!',
        `USERS: USER (${user.ci}) REMOVED.`)

    } else if (user === 'NONE') {

      response.error(req, res, 404,
        'El usuario que esta buscando no se encuentra registrado.', 
        'Usuario no encontrado!',
        `USERS_NETWORK: User (${req.params.ci}) not registered.`)

    } else {
      return false
    }

  } catch(error) {
    
    response.error(req, res, 500,
      'No pudimos procesar tu solicitud.', 
    'Error interno.', 
    `[SERVER_ERROR]: ${error}`)

  }
}

module.exports = router