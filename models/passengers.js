const mongoose = require('mongoose')

const passengersSchema = new mongoose.Schema({
  ticketNo: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  age: {
    type: String,
    required: true
  },
  sex: {
    type: String,
    required: true
  },
  birth: {
    type: String,
  },
  status: {
    type: String,
  },

  createdDate: {
    type: Date,
    required: true,
    default: Date.now
  }
})

module.exports = mongoose.model('Passengers', passengersSchema)