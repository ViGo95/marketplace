// Dependencies
const { nanoid } = require('nanoid')

// Modules
const Model = require('./model')
const auth = require('../auth')

module.exports = () => {

  // Funciones para usuarios
  async function list() {

    try {

      const users = await Model.find()
      
      return users
      
    } catch (error) {

      return error

    }
  }

  async function get(ci) {
    
    try {
      
      const user = await Model.findOne({ci})
      
      return user

    } catch (error) {
      
      return error

    }
  }

  async function upsert(body) {

    if (!body.id) {

      body.id = nanoid(10)

        if (body.name !== 'Master') {
    
          var { ci, name, phone, email, use, salary, level, active } = body
    
          if (!ci || !name || !phone || !email || !salary || !level) {
    
            return null
          }
        }

      try {

        const user = await Model.create(body)
        
        await auth.upsert({
          id: user.id,
          ci: user.ci,
          password: body.password,
          level: user.level,
          active: user.active
        })
  
        return user
        
      } catch (error) {
        
        return error
      
      }

    } else if (active || active === false) {

      try {
  
        const user = await Model.findOneAndUpdate(body)
  
        await auth.upsert(body)
  
        return user
        
      } catch (error) {
  
        return error

      }  

    } else {

      try {
        
        const user = await Model.findOneAndUpdate(body)
  
        if (level || password) {
          await auth.upsert({
            id: user.id,
            username: level,
            password: password,
          })
        }
  
        return user

      } catch (error) {
      
        return error

      }
    }
  }

  async function remove(ci) {

    try {
      
      const user = await Model.findOneAndDelete({ci})
  
      await auth.remove(ci) 

      return user
      
    } catch (error) {
     
      return error

    }
  }

  return {
    list,
    get,
    upsert,
    remove,
  }
}
