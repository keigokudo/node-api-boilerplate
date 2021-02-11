const express = require('express')
const app = express()
const logger = require('morgan')

const sampleRoutes = require('./routes/sample')

app.use(logger('dev'))
app.use('/sample', sampleRoutes)

module.exports = app
