const express = require('express')
const app = express()
const logger = require('morgan')
const bodyParser = require('body-parser')

const sampleRoutes = require('./routes/sample')

// middlewares
app.use(logger('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

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
