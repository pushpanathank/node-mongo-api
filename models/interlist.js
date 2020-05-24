const mongoose = require('mongoose')

const trainInterListSchema = new mongoose.Schema({
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
  stn1: {
    type: String,
    required: true
  },
  stn2: {
    type: String,
    required: true
  },
  ac1Price: {
    type: String,
  },
  ac1PriceTatkal: {
    type: String,
  },
  ac2Price: {
    type: String,
  },
  ac2PriceTatkal: {
    type: String,
  },
  ac3Price: {
    type: String,
  },
  ac3PriceTatkal: {
    type: String,
  },
  slPrice: {
    type: String,
  },
  slPriceTatkal: {
    type: String,
  },
  generalPrice: {
    type: String,
  },
  generalPriceTatkal: {
    type: String,
  },

  createdDate: {
    type: Date,
    required: true,
    default: Date.now
  }
})

module.exports = mongoose.model('InterList', trainInterListSchema)