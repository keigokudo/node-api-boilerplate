const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const User = require('../models/user')

router.post('/signup', (req, res, next) => {
  //   User.find({ email: req.body.email })
  //     .exec()
  //     .then((user) => {
  //       if (user) {
  //         return res.status(409).json({
  //           message: 'E-mail already exsists',
  //         })
  //       }
  //     })

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

module.exports = router
