const jwt = require('jsonwebtoken')
const { SECRET } = require('./config.js')

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')

  console.log(SECRET)

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      console.log(authorization.substring(7))
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
    } catch(err) {
      console.error(err)
      return res.status(401).json({ err })
    }
  } else {
    return res.status(401).json({ error: 'token missing' })
  }

  next()
}

module.exports = { tokenExtractor }