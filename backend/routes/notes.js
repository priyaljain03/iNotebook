const express = require('express')
const router = express.Router()
const Note = require('../models/Notes')
var fetchUser = require('../middleware/fetchUser')
const { body, validationResult } = require('express-validator')

router.get('/fetchAllNotes', fetchUser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id })
        res.json(notes)
    } catch (error) {
        res.status(500).send("Some error occurred")
    }

})


//ROute2 : Add a Note
router.post('/addnote', fetchUser, [
    body('title', 'Enter a Valid Title').isLength({ min: 3 }),
    body('description', 'Length should be atleast 5').isLength({ min: 5 })
], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    try {
        const { title, description, tag } = req.body
        const note = new Note({
            title,
            description,
            tag,
            user: req.user.id
        })
        const savedNote = await note.save()
        res.json(savedNote)
    } catch (error) {
        res.status(500).send("Some error occurred")
    }
})

module.exports = router