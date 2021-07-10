const mongoose = require('mongoose')
const Schema = mongoose.Schema

const user = new Schema({
  id: {
    type: String,
    required: 'ID required!'
  },
  ci: {
    type: Number,
    required: 0,
    unique: true,
    min: 1000000,
    max: 100000000
  },
  name: {
    type: String,
    required: 'Name required!'
  },
  date: {
    type: Date,
    default: Date.now
  },
  phone: {
    type: String,
    default: 'None',
    // minLenght: 13,
    // maxLenght: 13
  },
  email: {
    type: String,
    default: 'None'
  },
  // use: {
  //   type: String,
  //   default: 'None',
    // enum: []
  // },
  salary: {
    type: Number,
    default: 0
  },
  level: {
    type: Number,
    required: 'Level required!',
    // min: 1,
    // max: 3
    enum: [1, 2, 3]
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  active: {
    type: Boolean,
    default: true
  },
})

const Model = mongoose.model('users', user)

module.exports = Model