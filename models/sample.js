const mongoose = require('mongoose')

const sampleSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  number: Number,
})

module.exports = mongoose.model('Sample', sampleSchema)
