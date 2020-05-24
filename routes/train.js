const express = require('express')
const router = express.Router()
const Train = require('../models/train')
const InterList = require('../models/interlist')
const SeatsAvailability = require('../models/seats-availability')

// Getting all trains
router.get('/', async (req, res) => {
  try {
    const trains = await Train.find()
    res.json(trains)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Creating one train
router.post('/add', async (req, res) => {
  const train = new Train({
    trainNo: req.body.trainNo,
    trainName: req.body.trainName,
    origin: req.body.origin,
    destination: req.body.destination,
    depature: req.body.depature,
    arrival: req.body.arrival,
    ac1: req.body.ac1,
    ac2: req.body.ac2,
    ac3: req.body.ac3,
    sl: req.body.sl,
    general: req.body.general,
    fares: '',
  })

  try {
    const newTrain = await train.save()
    const list = new InterList({
      trainId: newTrain._id,
      trainNo: newTrain.trainNo,
      trainName: newTrain.trainName,
      stn1: newTrain.origin,
      stn2: newTrain.destination,
      ac1Price: '',
      ac1PriceTatkal: '',
      ac2Price: '',
      ac2PriceTatkal: '',
      ac3Price: '',
      ac3PriceTatkal: '',
      slPrice: '',
      slPriceTatkal: '',
      generalPrice: '',
      generalPriceTatkal: ''
    })
    await list.save();
    res.status(200).json(newTrain)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

router.post('/edit', async (req, res) => {
  let id = req.body._id;
  const train = {
    trainNo: req.body.trainNo,
    trainName: req.body.trainName,
    origin: req.body.origin,
    destination: req.body.destination,
    depature: req.body.depature,
    arrival: req.body.arrival,
    ac1: req.body.ac1,
    ac2: req.body.ac2,
    ac3: req.body.ac3,
    sl: req.body.sl,
    general: req.body.general,
  };

  try {
    const updateTrain = await Train.findByIdAndUpdate({_id: id},train);
    res.status(200).json(updateTrain)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

router.post('/delete', async (req, res) => {
  let id = req.body.id;
  try {
    await Train.deleteOne({_id: id},(err, docs) =>{
      if (err) {
          res.status(400).json({ message: err.message })
      } else {
        SeatsAvailability.deleteMany({'trainId':id});
          res.status(200).json('removed successfully')
      }
    })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Getting one train by id
router.get('/:id', getTrain, (req, res) => {
  res.json(res.train)
})


// Middleware function for gettig train object by ID
async function getTrain(req, res, next) {
  try {
    train = await Train.findById(req.params.id)
    if (train == null) {
      return res.status(400).json({ message: 'Cant find train'})
    }
  } catch(err){
    return res.status(400).json({ message: err.message })
  }
  
  res.train = train
  next()
}

router.post('/search', searchTrains, (req, res) => {
  res.json(res.seats)
})


// Middleware function for getting seats by search criteria
async function searchTrains(req, res, next) {
  const data = req.body;

  await Train.find({origin: data.origin, destination: data.destination})
  .populate({path: 'seats_available', select: 'date'})
  .exec(function (err, train) {
    // console.log("train", train);
    if (err)
    {
      res.status(400).json({ message: err.message })
    }

    let trainIds = [];
    train.map(t=> trainIds.push(t._id));

    SeatsAvailability.find({
        'trainId': { $in: trainIds }, 'date': data.date
    }, function(err, seats) {
      if (err)
      {
        res.status(400).json({ message: err.message })
      }

      let _avail = {};
      seats.map(s=>{
        _avail[s.trainId] = s;
      });
      let _available = [];
      train.map(t=> {
        if(_avail.hasOwnProperty(t._id)){
          t.seats_available = _avail[t._id];
          _available.push(t);
        }
      });
      InterList.find({
          'trainId': { $in: trainIds }
      }, function(err, fares) {
        let _fare = {};
        fares.map(f=> _fare[f.trainId] = f );

        _available.map((t, i)=> {
          _available[i]['fares'] = _fare[t._id];
        });
        res.status(200).json(_available)
      });
      // res.status(200).json(_available)
    });
    
  });
  // .populate('author');
  return;
  await Train.find({origin: data.origin, destination: data.destination}, function(err, trains) 
  {
    if (err)
    {
      res.status(400).json({ message: err.message })
    }
    res.status(200).json(trains)
  });
  next()
}

module.exports = router 