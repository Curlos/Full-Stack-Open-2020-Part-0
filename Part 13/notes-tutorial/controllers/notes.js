const router = require('express').Router()

const { Note } = require('../models')

router.get('/', async (req, res) => {
  try {
    const notes = await Note.findAll()
    console.log(JSON.stringify(notes, null, 2))
    res.json(notes)
  } catch (err) {
    console.error(err)
  }
})

router.post('/', async (req, res) => {
  try {
    console.log(req.body)
    const note = await Note.create(req.body)
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