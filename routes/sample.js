const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Sample = require('../models/sample')
const auth = require('../middleware/auth')
const multerUpload = require('../middleware/multer')

const sampleController = require('../controller/sample')

router.get('/', sampleController.sampleGetAll)

router.post('/', auth, multerUpload.single('sampleImage'), (req, res, next) => {
  console.log(req.file)
  const sample = new Sample({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    number: req.body.number,
    image: req.file.path,
  })
  sample
    .save()
    .then((result) => {
      console.log(result)
      res.status(201).json({
        message: 'data created',
        createdData: {
          _id: result.sampleId,
          name: result.name,
          number: result.number,
        },
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
    .select('_id name number image')
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

router.patch('/:sampleId', auth, (req, res, next) => {
  const id = req.params.sampleId
  const updateOperations = {}
  for (const ops of req.body) {
    updateOperations[ops.propName] = ops.value
  }

  Sample.updateOne({ _id: id }, { $set: updateOperations })
    .exec()
    .then((result) => {
      console.log(result)
      res.status(200).json({ message: 'data updated', result: result })
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({ error: err })
    })
})

router.delete('/:sampleId', auth, (req, res, next) => {
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
