const express = require('express')
const app = express()

const sampleRoutes = require('./routes/sample')

app.use('/sample', sampleRoutes)

module.exports = app
