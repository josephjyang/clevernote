const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { Note } = require('../../db/models');

const router = express.Router();

const validateNote = [
    check('name')
        .exists({ checkFalsy: true })
        .isLength({ min: 1 })
        .withMessage('Please provide a title for the note.'),
    check('userId')
        .exists({ checkFalsy: true })
        .withMessage('Please log in.'),
    handleValidationErrors
];

router.put('/:id', requireAuth, validateNote, asyncHandler(async (req, res) => {
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