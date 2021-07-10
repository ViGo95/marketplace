const mongoose = require('mongoose')
const Schema = mongoose.Schema

const credential = new Schema({
  id: {
    type: String,
    required: 'ID required!'
  },
  ci: {
    type: Number,
    required: 'CI required!'
  },
  password: {
    type: String,
    required: 'Password required!'
  },
  level: {
    type: Number,
    required: 'Level required!'
  },
  active: {
    type: Boolean,
    default: true
  },
})

const Model = mongoose.model('credentials', credential)

module.exports = Model