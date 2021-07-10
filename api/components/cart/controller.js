const { nanoid } = require('nanoid')

const error = require('../../utils/error')
const Model = require('./model')

module.exports = (injectedStore) => {
  let store = injectedStore

  // if (!store) {
  //   store = require('../../../store/mock')
  // }

  async function list() {
    const carts = await Model.find()
  
    return carts
  }

  async function get(id) {
    const cart = await Model.findOne({id})
  
    return cart
  }

  async function upsert(body) {
    
    if (!body.id) {
      body.id = nanoid(10)
      
      if (!body.client || !body.articles || !body.amount || !body.count || !body.location) {
        throw error('Debe completar los campos', 400)
      }
      
      const cart = Model.create(body)
      
      return cart

    } else if (body.active || body.active === false) {  // Activar o desactivar clientes

      const cart = {
        id: body.id,
      }

      const result = await Model.findOneAndUpdate({id: cart.id},
        {$set: cart}, 
        {safe: true, new: true}
      )

      return result

    } else {  // Modificar clientes

      const cart = {
        id: body.id,
      }

      if (body.client) {
        cart.client = body.client
      }

      if (body.articles) {
        cart.articles = body.articles
      }

      if (body.count) {
        cart.count = body.count
      }

      if (body.amount) {
        cart.amount = body.amount
      }

      if (body.location) {
        cart.location = body.location
      }
      
      const result = await Model.findOneAndUpdate({id: cart.id},
        {$set: cart}, 
        {safe: true, new: true}
      )

      return result
    }
  }

  async function remove(id) {
    const cart = await Model.findOneAndDelete({id})

    return cart
  }

  return {
    list,
    get,
    upsert,
    remove,
  }
}
