const express = require('express');
const asyncHandler = require('express-async-handler');

const { requireAuth } = require('../../utils/auth');
const { Note } = require('../../db/models');

const router = express.Router();

router.put('/:id', requireAuth, asyncHandler(async (req, res) => {
    const noteId = req.params.id;
    const { name, content, userId, notebookId } = req.body
    const note = await Note.findByPk(noteId)
    const updatedNote = await note.update({ name, content, userId, notebookId });

    return res.json(updatedNote)
}))

router.delete('/:id', requireAuth, asyncHandler(async (req, res) => {
    const noteId = req.params.id;

    const note = await Note.findByPk(noteId)
    await note.destroy();
    res.status = 204;
    return res.end();
}))

module.exports = router;