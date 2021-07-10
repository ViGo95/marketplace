const { nanoid } = require('nanoid')

const error = require('../../utils/error')
const Model = require('./model')

module.exports = (injectedStore) => {
  let store = injectedStore

  // if (!store) {
  //   store = require('../../../store/mock')
  // }

  async function list() {
    const articles = await Model.find()
  
    return articles
  }

  async function get(id) {
    const articles = await Model.findOne({id})
  
    return articles
  }

  async function upsert(body) {
    
    if (!body.id) {
      body.id = nanoid(10)

      if (!body.name || !body.price || !body.quantity) {
        throw error('Debe completar los campos', 400)
      }

      // const article = model.articles(body)
      const article = Model.create(body)

      // return store.insert(TABLE, article)
      return article

    } else if (body.active || body.active === false) {  // Activar o desactivar acticulos

      const article = {
        id: body.id,
      }

      const result = await Model.findOneAndUpdate({id: article.id},
        {$set: article}, 
        {safe: true, new: true}
      )

      return result

    } else {  // Modificar articulos

      const article = {
        id: body.id,
      }

      if (body.name) {
        article.name = body.name
      }

      if (body.description) {
        article.description = body.description
      }

      if (body.price) {
        article.price = body.price
      }

      // if (body.photo) {
      //   article.photo = body.photo
      // }

      if (body.quantity) {
        article.quantity = body.quantity
      }
      
      const result = await Model.findOneAndUpdate({id: article.id},
        {$set: article}, 
        {safe: true, new: true}
      )

      return result
    }
  }

  async function remove(id) {
    const article = await Model.findOneAndDelete({id})

    return article
  }

  return {
    list,
    get,
    upsert,
    remove,
  }
}
