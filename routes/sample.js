const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Sample = require('../models/sample')

router.get('/', (req, res, next) => {
  Sample.find()
    .limit(100)
    .exec()
    .then((docs) => {
      console.log(docs)
      res.status(200).json(docs)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({ error: err })
    })
})

router.post('/', (req, res, next) => {
  const sample = new Sample({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    number: req.body.number,
  })
  sample
    .save()
    .then((result) => {
      console.log(result)
      res.status(201).json({
        message: 'handing POST requests to /sample',
        createdData: result,
      })
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({ error: err })
    })
})

router.get('/:sampleId', (req, res, next) => {
  const id = req.params.sampleId
  Sample.findById(id)
    .exec()
    .then((doc) => {
      console.log('from db', doc)
      if (doc) {
        res.status(200).json(doc)
      }
    })
    .catch((err) => {
      console.log(err)
      res
        .status(500)
        .json({ message: 'No valid entry found for this sampleId', error: err })
    })
})

router.patch('/:sampleId', (req, res, next) => {
  const id = req.params.sampleId
  const updateOperations = {}
  for (const ops of req.body) {
    updateOperations[ops.propName] = ops.value
  }

  Sample.updateOne({ _id: id }, { $set: updateOperations })
    .exec()
    .then((result) => {
      console.log(result)
      res.status(200).json(result)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({ error: err })
    })
})

router.delete('/:sampleId', (req, res, next) => {
  const id = req.params.sampleId
  Sample.remove({ _id: id })
    .exec()
    .then((result) => {
      res
        .status(200)
        .json({ message: `item deleted. sampleId: ${id}`, result: result })
    })
    .catch((err) => {
      res.status(500).json({ error: err })
    })
})

module.exports = router
