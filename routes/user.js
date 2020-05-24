const express = require('express')
const router = express.Router()
const User = require('../models/user')

// Getting all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find()
    res.json(users)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Creating one user
router.post('/', async (req, res) => {
  const user = new User({
    name: req.body.name,
    username: req.body.username,
    password: req.body.password.trim(),
    role: req.body.role,
  })

  try {
    const newUser = await user.save()
    res.status(201).json(newUser)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Getting one user by id
router.get('/:id', getUser, (req, res) => {
  res.json(res.user)
})


// Middleware function for gettig user object by ID
async function getUser(req, res, next) {
  try {
    user = await User.findById(req.params.id)
    if (user == null) {
      return res.status(404).json({ message: 'Cant find user'})
    }
  } catch(err){
    return res.status(500).json({ message: err.message })
  }
  
  res.user = user
  next()
}

// Getting one user by username
router.post('/login', getUserByUsername, (req, res) => {
  res.json(res.user)
})

// Middleware function for gettig user object by username
async function getUserByUsername(req, res, next) {
  try {
    user = await User.find({ 'username': req.body.username })
    if(user.length>0){
      let u = user[0];
      if(u.password == req.body.password.trim()){
        let userData = {
          id: u.id,
          name: u.name,
          username: u.username,
          role: u.role,
        }
        res.user = { data: userData, status: 200};
      }else{
        return res.status(404).json({ message: 'Wrong Password'})
      }
    }
    if (user == null) {
      return res.status(404).json({ message: 'Cant find user'});
    }
  } catch(err){
    return res.status(500).json({ message: err.message });
  }
  
  // res.user = user
  next()
}

module.exports = router 