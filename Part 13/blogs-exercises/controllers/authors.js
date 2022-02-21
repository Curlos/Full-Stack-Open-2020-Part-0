const router = require('express').Router()
const sequelize = require('sequelize')

const { Blog } = require('../models')

router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.findAll({
      attributes: ['author', [sequelize.fn('COUNT', sequelize.col('author')), 'articles'], [sequelize.fn('SUM', sequelize.col('likes')), 'likes']],
      group: 'author'
    })
  
    res.json(blogs)
  } catch (error) {
    res.json({ error })
  }
})

module.exports = router
