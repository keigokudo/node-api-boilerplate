const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const User = require('../models/user')

router.post('/signup', (req, res, next) => {
  // Need to resolve UnhandledPromiseRejectionWarning
  // emailExists(req).catch((err) => {
  //   res.status(409).json({
  //     message: err.message,
  //   })
  // })

  const saltRounds = 10
  const hash = bcrypt.hashSync(req.body.password, saltRounds)
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    email: req.body.email,
    password: hash,
  })

  user
    .save()
    .then((result) => {
      res.status(200).json({
        message: 'user created',
        result: result,
      })
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({
        message: err,
      })
    })
})

// validation for the duplication of the email in user collection
const emailExists = async (req) => {
  const post = await User.findOne({ email: req.body.email })
  console.log('post', post)
  if (post.email) {
    throw new Error('Email already exists')
  }
}

router.post('/login', (req, res, next) => {
  User.findOne({ email: req.body.email })
    .exec()
    .then((user) => {
      // check if the user exists
      if (!user) {
        return res.status(401).json({
          message: 'Auth failed',
        })
      }
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (result) {
          return res.status(200).json({
            message: 'Auth successful',
          })
        } else {
          return res.status(401).json({
            message: 'Auth failed!',
          })
        }
      })
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({
        error: err,
      })
    })
})

router.delete('/:userId', (req, res, next) => {
  User.remove({ _id: req.params.userId })
    .exec()
    .then((result) =>
      result.status(200).json({
        message: 'User deleted',
      })
    )
    .catch((err) => {
      console.log(err)
      res.status(500).json({
        error: err,
      })
    })
})

module.exports = router
