const router = require('express').Router()
const jwt = require('jsonwebtoken')
require('express-async-errors')
const { SECRET } = require('../util/config')
const { Blog, User } = require('../models')


// router.use(async (req, res, next) => {
//   console.log(req.body)
//   next()
// })

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    
    console.log(authorization.substring(7))
    console.log(SECRET)
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
      console.log(req.decodedToken)
    } catch (err) {
      return res.status(401).json({ err })
    }
  } else {
    return res.status(401).json({ error: 'token missing'})
  }

  next()
}

router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.findAll({
      attributes: { exclude: ['userId'] },
      include: {
        model: User,
        attributes: ['name']
      }
    })
    res.json(blogs)
  } catch (err) {
    console.error(err)
  }
})

router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id)
    res.json(blog)
  } catch (err) {
    res.status(404).json(err)
  }
})

router.post('/', tokenExtractor, async (req, res) => {
  try {
    const user = await User.findByPk(req.decodedToken.id)
    const blog = await Blog.create({
      ...req.body,
      userId: user.id,
      date: new Date()
    })
    return res.json(blog)
  } catch (err) {
    return res.status(400).json({ err })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id)
    blog.likes = blog.likes + 1
    await blog.save()
    res.json({ likes: blog.likes })
  } catch (err) {
    res.status(404).json(err)
  }
})

router.delete('/:id', tokenExtractor, async (req, res) => {
  try {
    const user = await User.findByPk(req.decodedToken.id)
    const blog = await Blog.findByPk(req.params.id)

    if (user.id === blog.userId) {
      await blog.destroy()
      return res.json({ blog, user})
    }

    return res.json({ 
      error: 'Must be author to delete blog!'
    })
  } catch (err) {
    res.status(404).json(err)
  }
})

module.exports = router