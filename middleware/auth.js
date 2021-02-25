const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  try {
    // expected headers.authrorization has a format of 'Bearer token'
    const token = req.headers.authorization.split(' ')[1]
    const decode = jwt.verify(token, process.env.JWT_KEY)
    req.userData = decode
    next()
  } catch (err) {
    return res.status(401).json({
      message: 'Auth failed',
    })
  }
}
