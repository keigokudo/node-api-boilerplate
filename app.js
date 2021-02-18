const express = require('express')
const app = express()
const logger = require('morgan')
const bodyParser = require('body-parser')
require('dotenv').config()
const mongoose = require('mongoose')

const sampleRoutes = require('./routes/sample')

const uri =
  'mongodb+srv://' +
  process.env.MONGODB_USERNAME +
  ':' +
  process.env.MONGODB_PASSWORD +
  '@cluster0.ei5mh.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true })

// middlewares
app.use(logger('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Add headers for CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )
  // allow preflight requests
  if (req.method === 'OPTION') {
    res.header('Access-Control-Allow-Methods', 'PATCH PUT DELETE')
    return res.status(200).json({})
  }
  next()
})

// allow route '/uploads'
app.use('/uploads', express.static('uploads'))
// routes
app.use('/sample', sampleRoutes)

// error handling
app.use((req, res, next) => {
  const error = new Error('Route not found')
  error.status = 404
  next(error)
})

app.use((error, req, res, next) => {
  res.status(error.status || 500)
  res.json({
    error: {
      message: error.message,
    },
  })
})

module.exports = app
