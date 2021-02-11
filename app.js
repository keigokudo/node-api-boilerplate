const express = require('express')
const app = express()
const logger = require('morgan')

const sampleRoutes = require('./routes/sample')

app.use(logger('dev'))
app.use('/sample', sampleRoutes)

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
