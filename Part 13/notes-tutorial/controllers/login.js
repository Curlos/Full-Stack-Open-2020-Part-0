const jwt = require('jsonwebtoken')
const router = require('express').Router()

const { SECRET } = require('../util/config')
const User = require('../models/user')
const { response } = require('express')

router.post('/', async (req, res) => {
  try {
    console.log(req.body)
    const user = await User.findOne({
      where: {
        username: req.body.username
      }
    })

    const passwordCorrect = (
      req.body.password && 
      req.body.password === SECRET
    )
  
    if (!(user && passwordCorrect)) {
      return response.status(401).json({
        error: 'invalid username or password'
      })
    }

    const userForToken = {
      username: user.username,
      id: user.id,
    }
  
    const token = jwt.sign(userForToken, SECRET)
  
    res
      .status(200)
      .send({ token, username: user.username, name: user.name })
      
  } catch (err) {
    res.json({ err })
  }
})

module.exports = router