const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const User = require('../models/user')

router.post('/signup', async (req, res, next) => {
  //   User.find({ email: req.body.email })
  //     .exec()
  //     .then((user) => {
  //       if (user) {
  //         return res.status(409).json({
  //           message: 'E-mail already exsists',
  //         })
  //       }
  //     })
  // try {
  //   const post = await User.findOne({ email: req.body.email })
  //   if (post.email) {
  //     throw new Error('e-mail')
  //   }
  // } catch (err) {
  //   console.log('err::', err)
  // }

  // try {
  //   const post = await User.findOne({ email: req.body.email })
  //   if (post.email) {
  //     res.status(409).json({
  //       message: 'E-mail already exsists',
  //     })
  //     throw new Error('email')
  //   }
  // } catch (err) {
  //   reject(err)
  // }

  // User.findOne({ email: req.body.email })
  //   .then((post) => {
  //     console.log('post', post)
  //     if (post.email) {
  //       return res.status(409).json({
  //         message: 'E-mail already exsists',
  //       })
  //     }
  //     return next()
  //   })
  //   .catch(next)

  // if (post.email) {
  //   throw res.status(409).json({
  //     message: 'E-mail already exsists',
  //   })
  // }
  // console.log('post.email:::', post.email)

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
