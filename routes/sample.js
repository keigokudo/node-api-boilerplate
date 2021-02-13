const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Sample = require('../models/sample')

router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'handing GET requests to /sample',
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
  res.status(200).json({ message: 'update' })
})

router.delete('/:sampleId', (req, res, next) => {
  res.status(200).json({ message: 'delete' })
})

module.exports = router
