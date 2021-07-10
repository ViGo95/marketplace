const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = mongoose.ObjectId

const cart = new Schema({
  id: {
    type: String,
    required: 'ID required!'
  },
  client: {
    type: ObjectId,
    ref: 'clients',
    autopopulate: true,
    required: 'Client required!'
  },
  articles: [{
    type: ObjectId,
    ref: 'articles',
    autopopulate: true,
    required: 'Articles required!'
  }],
  count: [{
    type: Number,
    default: 'Count required!'
  }],
  location: {
    type: String,
    default: 'Location required!'
  },
  amount: {
    type: Number,
    default: 'Amount required!'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

cart.plugin(require('mongoose-autopopulate'))
const Model = mongoose.model('carts', cart)

module.exports = Model