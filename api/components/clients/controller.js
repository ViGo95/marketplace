const { nanoid } = require('nanoid')

const error = require('../../utils/error')
const Model = require('./model')

module.exports = (injectedStore) => {
  let store = injectedStore

  // if (!store) {
  //   store = require('../../../store/mock')
  // }

  async function list() {
    const clients = await Model.find()
  
    return clients
  }

  async function get(id) {
    const client = await Model.findOne({id})
  
    return client
  }

  async function upsert(body) {
    
    if (!body.id) {
      body.id = nanoid(10)
      
      if (!body.ci || !body.name || !body.location) {
        throw error('Debe completar los campos', 400)
      }

      const client = Model.create(body)
      
      return client

    } else if (body.active || body.active === false) {  // Activar o desactivar clientes

      const client = {
        id: body.id,
      }

      const result = await Model.findOneAndUpdate({id: client.id},
        {$set: client}, 
        {safe: true, new: true}
      )

      return result

    } else {  // Modificar clientes

      const client = {
        id: body.id,
      }

      if (body.ci) {
        client.ci = body.ci
      }

      if (body.name) {
        client.name = body.name
      }

      if (body.location) {
        client.location = body.location
      }
      
      const result = await Model.findOneAndUpdate({id: client.id},
        {$set: client}, 
        {safe: true, new: true}
      )

      return result
    }
  }

  async function remove(id) {
    const client = await Model.findOneAndDelete({id})

    return client
  }

  return {
    list,
    get,
    upsert,
    remove,
  }
}
