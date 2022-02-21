const router = require('express').Router()
const { Op } = require('sequelize')
const jwt = require('jsonwebtoken')

const { SECRET } = require('../util/config')
const { Note, User } = require('../models')

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

router.get('/', async (req, res) => {
  try {
    const where = {}

    let important = {
      [Op.in]: [true, false]
    }

    if (req.query.important) {
      where.important = req.query.important === "true"
    }

    if (req.query.search) {
      where.content = {
        [Op.substring]: req.query.search
      }
    }

    const notes = await Note.findAll({
      attributes: { exclude: ['userId'] },
      include: {
        model: User,
        attributes: ['name']
      },
      where
    })
    console.log(JSON.stringify(notes, null, 2))
    res.json(notes)
  } catch (err) {
    console.error(err)
  }
})

router.post('/', tokenExtractor, async (req, res) => {
  try {
    console.log(req.decodedToken)
    console.log(req.body)
    const user = await User.findByPk(req.decodedToken.id)
    const note = await Note.create({ 
      ...req.body, 
      userId: user.id, 
      date: new Date()
    })
    return res.json(note)
  } catch (err) {
    return res.status(400).json({ err })
  }
})

router.get('/:id', async (req, res) => {
  console.log(req.params.id)
  try {
    const note = await Note.findByPk(req.params.id)
    if (note) {
      res.json(note)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    console.error(err)
  }
})

router.put('/:id', async (req, es) => {
  const note = await Note.findByPik(req.params.id)
  if (note) {
    note.important = req.body.important
    await note.save()
    res.json(note)
  } else {
    res.status(404).end()
  }
})

module.exports = router