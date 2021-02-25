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
