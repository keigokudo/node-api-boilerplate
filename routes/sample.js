const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const multer = require('multer')
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + '-' + file.originalname)
  },
})
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    // accept the file
    cb(null, true)
  } else {
    // reject the file
    cb(null, false)
  }
}
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5, fileFilter: fileFilter },
})

const Sample = require('../models/sample')

router.get('/', (req, res, next) => {
  Sample.find()
    .select('_id name number image') // as an alternative you can subtract with ('- __v')
    .limit(100)
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        sample: docs,
      }
      console.log(docs)
      res.status(200).json(response)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({ error: err })
    })
})

router.post('/', upload.single('sampleImage'), (req, res, next) => {
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
      res.status(200).json({ message: 'data updated', result: result })
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
