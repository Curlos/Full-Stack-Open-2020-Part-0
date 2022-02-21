const router = require('express').Router()

const { Blog } = require('../models')

router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.findAll()
    res.json(blogs)
  } catch (err) {
    console.error(err)
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

router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id)
    res.json(blog)
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