const mongoose = require('mongoose')

const bookTicketSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  ticketNo: {
    type: String,
    required: true
  },
  trainNo: {
    type: String,
    required: true
  },
  trainName: {
    type: String,
    required: true
  },
  origin: {
    type: String,
    required: true
  },
  destination: {
    type: String,
    required: true
  },
  doj: {
    type: String,
    required: true
  },
  depature: {
    type: String,
    required: true
  },
  arrival: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  passengers: {
    type: Object,
  },

  createdDate: {
    type: Date,
    required: true,
    default: Date.now
  }
})

module.exports = mongoose.model('BookTicket', bookTicketSchema)