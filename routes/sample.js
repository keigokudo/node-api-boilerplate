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

router.get('/:sampleId', (req, res, next) => {
  const id = req.params.sampleId

  res.status(200).json({ message: `you passed this: ${id}` })
})

router.patch('/:sampleId', (req, res, next) => {
  res.status(200).json({ message: 'update' })
})

router.delete('/:sampleId', (req, res, next) => {
  res.status(200).json({ message: 'delete' })
})

module.exports = router
