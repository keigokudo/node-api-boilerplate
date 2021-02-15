const mongoose = require('mongoose')

const sampleSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  number: { type: Number, required: true },
})

module.exports = mongoose.model('Sample', sampleSchema)
