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

router.delete('/:sampleId', userAuth, sampleController.sampleDelete)

module.exports = router
