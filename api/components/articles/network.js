const router = require('express').Router()

const Controller = require('./index')
const response = require('../../utils/response')

router.get('/', list)
router.get('/:id', get)
router.post('/', upsert)
router.put('/', upsert)
router.delete('/:id', remove)

function list(req, res, next) {

  Controller.list()
    .then(list => {
      response.success(req, res, 200, list)
    })
    .catch(next)
}

function get(req, res, next) {
  Controller.get(req.params.id)
    .then(article => {
      response.success(req, res, 200, article)
    })
    .catch(next)
}

function upsert(req, res, next) {

  Controller.upsert(req.body)
    .then(result => {
      response.success(req, res, 201, result)
    })
    .catch(next)
}

function remove(req, res, next) {

  Controller.remove(req.params.id)
    .then(result => {
      response.success(req, res, 200, result)
    })
    .catch(next)
}

module.exports = router