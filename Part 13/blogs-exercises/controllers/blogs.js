const router = require('express').Router()
require('express-async-errors')
const { Blog } = require('../models')

// router.use(async (req, res, next) => {
//   console.log(req.body)
//   next()
// })

router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.findAll()
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

router.post('/', async (req, res) => {
  try {
    console.log(req.body)
    const blog = await Blog.create(req.body)
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

router.delete('/:id', async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id)
    await blog.destroy()
    res.json(blog)
  } catch (err) {
    res.status(404).json(err)
  }
})

module.exports = router