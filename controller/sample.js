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

exports.samplePost = (req, res, next) => {
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
}
