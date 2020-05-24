const express = require('express')
const router = express.Router()
const SeatsAvailability = require('../models/seats-availability')

// Creating one seat
router.post('/add', async (req, res) => {
  const seat = new SeatsAvailability({
    trainId: req.body.id,
  })

  try {
    const newSeatsAvailability = await seat.save()
    res.status(200).json(newSeatsAvailability)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

router.post('/dummy-add', async (req, res) => {

  const schedules = JSON.parse(req.body.schedules)

  try {
    await SeatsAvailability.collection.insert(schedules, (err, docs) =>{
      if (err) {
          res.status(400).json({ message: err.message })
      } else {
          res.status(200).json(docs.length+' schedule were successfully stored.')
      }
    })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Getting one seats by id
router.get('/:id', getSeatsAvailability, (req, res) => {
  res.json(res.seats)
})


// Middleware function for gettig seats object by ID
async function getSeatsAvailability(req, res, next) {
  console.log("req.params.id", req.params.id);
  await SeatsAvailability.find({}, function(err, sche) 
  {
    if (err)
    {
      res.status(400).json({ message: err.message })
    }
    let schedules = [];
    sche.map(s => {
      if(s.trainId==req.params.id) schedules.push(s)
    });
    res.status(200).json(schedules)
  });
  next()
}

module.exports = router 