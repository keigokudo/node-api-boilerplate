const mongoose = require('mongoose')

const Sample = require('../models/sample')

exports.sampleGetAll = (req, res, next) => {
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
}

exports.sampleGetOne = (req, res, next) => {
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
}

exports.samplePost = (req, res, next) => {
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
          image: req.file.originalname,
        },
      })
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({ error: err })
    })
}

exports.samplePatch = (req, res, next) => {
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
}

exports.sampleDelete = (req, res, next) => {
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
}
