const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'handing GET requests to /sample',
  })
})

router.post('/', (req, res, next) => {
  res.status(200).json({
    message: 'handing POST requests to /sample',
  })
})

module.exports = router
