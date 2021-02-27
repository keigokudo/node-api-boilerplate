const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Sample = require('../models/sample')
const userAuth = require('../middleware/auth')
const multerUpload = require('../middleware/multer')

const sampleController = require('../controller/sample')

router.get('/', sampleController.sampleGetAll)

router.get('/:sampleId', sampleController.sampleGetOne)

router.post(
  '/',
  userAuth,
  multerUpload.single('sampleImage'),
  sampleController.samplePost
)

router.patch('/:sampleId', userAuth, sampleController.samplePatch)

router.delete('/:sampleId', userAuth, (req, res, next) => {
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
