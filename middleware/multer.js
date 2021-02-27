// config of multer
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

module.exports = upload
