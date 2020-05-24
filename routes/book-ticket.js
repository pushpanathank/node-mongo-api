const express = require('express')
const router = express.Router()
const BookTicket = require('../models/book-ticket')
const Passengers = require('../models/passengers')

// Creating one book-ticket
router.post('/add', async (req, res) => {
  const data = JSON.parse(req.body.data)
  let ticketno = Math.floor(Date.now() / 1000)
  let passengers = [...data.passengers];
  delete data.passengers;

  data.ticketNo = ticketno;
  data.status = 'Confirmed';
  const ticket = new BookTicket(data);

  try {
    const newTicket = await ticket.save()

console.log("newTicket._id", newTicket._id);
    passengers.map(p => {
      p.ticketNo = newTicket._id.toString()
    })

    await Passengers.collection.insert(passengers, (err, docs) =>{
      console.log("err", err);
    })

    res.status(200).json(newTicket)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Getting one ticket by id
router.get('/all/:id', getBookTicket, (req, res) => {
  res.json(res.ticket)
})


// Middleware function for getting object by ID
async function getBookTicket(req, res, next) {
  await BookTicket.find({}, function(err, tkts) 
  {
    if (err)
    {
      res.status(400).json({ message: err.message })
    }
    let tickets = {}
    let ticketNos = []
    tkts.map(s => {
      if(s.userId==req.params.id) {
        s.passengers = [];
        tickets[s._id] = s;
        ticketNos.push(s._id);
      }
    })

    Passengers.find({
        'ticketNo': { $in: ticketNos }
    }, function(err, pass) {
      pass.map(p => {
        tickets[p.ticketNo]['passengers'].push(p)
      })
      res.status(200).json(Object.values(tickets))
      next()
    })
  });


}

module.exports = router 