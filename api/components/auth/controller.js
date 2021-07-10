const bcrypt = require('bcrypt')

const auth = require('../../auth')
const Model = require('./model')
const error = require('../../utils/error')

module.exports = () => {

  async function login(ci, password) {

    try {
      
      const data = await Model.findOne({ci})
      
      const loginData = {
        id: data.id,
        ci: data.ci,
        password: data.password,
        level: data.level
      }
  
      const comparation = await bcrypt.compare(password, data.password)
  
      if (comparation) {
        const userLogged = {
          id: data.id,
          ci: data.ci,
          level: data.level,
        }
  
        userLogged.token = auth.sign(loginData)
  
        return userLogged
      
      } else {
        
        return null
      
      }

    } catch (err) {
     
      throw error(err, 500)

    }
  }

  async function upsert(data) {
    
    if (data.ci) {

      try {
        
        data.password = await bcrypt.hash(data.password, 5)
  
        Model.create(data)
  
        return true

      } catch (err) {
        
        throw error(err, 500)

      }

    } else {

      if (data.password) {

        try {

          data.password = await bcrypt.hash(data.password, 5)
          
        } catch (err) {
          
          throw error(err, 500)

        }
      }
      
      try {

        const result = await Model.findOneAndUpdate({id: data.id},
          {$set: data}, 
          {safe: true, new: true}
        )

        return result
        
      } catch (err) {
        
        throw error(err, 500)

      }
    }
  }

  async function remove (ci) {

    try {

      const credentials = await Model.findOneAndDelete({ci})
     
      return credentials
      
    } catch (err) {
      
      throw error(err, 500)

    }
  }

  return {
    upsert,
    login,
    remove
  }
}