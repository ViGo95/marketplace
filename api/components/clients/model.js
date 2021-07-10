const mongoose = require('mongoose')
const Schema = mongoose.Schema

const client = new Schema({
  id: {
    type: String,
    required: 'ID required!'
  },
  ci: {
    type: Number,
    required: 'CI required!'
  },
  name: {
    type: String,
    required: 'Name required!'
  },
  location: {
    type: String,
    default: 'Location required!'
  },
  active: {
    type: Boolean,
    default: true
  }
})

const Model = mongoose.model('clients', client)

module.exports = Model