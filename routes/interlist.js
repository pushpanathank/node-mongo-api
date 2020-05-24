const express = require('express')
const router = express.Router()
const InterList = require('../models/interlist')

// Creating one interlist
router.post('/add', async (req, res) => {
  const list = new InterList({
    trainId: req.body.id,
    trainNo: req.body.trainNo,
    trainName: req.body.trainName,
    stn1: req.body.stn1,
    stn2: req.body.stn2,
    ac1: req.body.ac1,
    ac2: req.body.ac2,
    ac3: req.body.ac3,
    sl: req.body.sl,
    general: req.body.general,
    ladies: req.body.ladies,
    tatkal: req.body.tatkal,
  })

  try {
    const newInterList = await list.save()
    res.status(200).json(newInterList)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

router.post('/edit', async (req, res) => {
  const data = JSON.parse(req.body.data)
  const update = {
    ac1Price: data.ac1Price,
    ac1PriceTatkal: data.ac1PriceTatkal,
    ac2Price: data.ac2Price,
    ac2PriceTatkal: data.ac2PriceTatkal,
    ac3Price: data.ac3Price,
    ac3PriceTatkal: data.ac3PriceTatkal,
    slPrice: data.slPrice,
    slPriceTatkal: data.slPriceTatkal,
    generalPrice: data.generalPrice,
    generalPriceTatkal: data.generalPriceTatkal
  }
  try {
    const updateList = await InterList.findByIdAndUpdate({_id: data._id},update);
    res.status(200).json(updateList)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Getting one seats by id
router.get('/:id', getInterList, (req, res) => {
  res.json(res.seats)
})


// Middleware function for getting object by ID
async function getInterList(req, res, next) {
  await InterList.find({}, function(err, sche) 
  {
    if (err)
    {
      res.status(400).json({ message: err.message })
    }
    let schedules = {};
    sche.map(s => {
      if(s.trainId==req.params.id) schedules = s
    });
    res.status(200).json(schedules)
  });


  next()
}

module.exports = router 