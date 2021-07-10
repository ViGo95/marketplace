const mongoose = require('mongoose')
const Schema = mongoose.Schema

const article = new Schema({
  id: {
    type: String,
    required: 'ID required!'
  },
  name: {
    type: String,
    required: 'Name required!'
  },
  marca: {
    type: String,
    default: 'Generico'
  },
  priceIn: {
    type: Number,
    required: 'Price in required!'
  },
  priceOut: {
    type: Number,
    required: 'Price out required!'
  },
  quantity: {
    type: Number,
    required: 'Quantity required!'
  },
  active: {
    type: Boolean,
    default: true
  }
})

const Model = mongoose.model('articles', article)

module.exports = Model