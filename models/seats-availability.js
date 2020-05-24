const mongoose = require('mongoose')

const trainSeatsAvailabilitySchema = new mongoose.Schema({
  trainId: {
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
  date: {
    type: String,
    required: true
  },
  ac1: {
    type: Number,
  },
  ac2: {
    type: Number,
  },
  ac3: {
    type: Number,
  },
  sl: {
    type: Number,
  },
  general: {
    type: Number,
  },
  ladies: {
    type: Number,
  },
  tatkal: {
    type: Number,
  },

  createdDate: {
    type: Date,
    required: true,
    default: Date.now
  }
})

module.exports = mongoose.model('SeatsAvailability', trainSeatsAvailabilitySchema)