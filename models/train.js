const mongoose = require('mongoose')

const trainSchema = new mongoose.Schema({
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
  depature: {
    type: String,
    required: true
  },
  arrival: {
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
  fares: {
    type: Object,
  },
  seats_available : [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref:'SeatsAvailability'
    }
  ],

  registeredDate: {
    type: Date,
    required: true,
    default: Date.now
  }
})

module.exports = mongoose.model('Train', trainSchema)