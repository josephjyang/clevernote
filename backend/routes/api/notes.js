const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { Note, NoteTag, Tag } = require('../../db/models');

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
    const note = await Note.findByPk(noteId, { include: Tag })
    const updatedNote = await note.update({ name, content, userId, notebookId });

    return res.json(updatedNote)
}))

router.delete('/:id', requireAuth, asyncHandler(async (req, res) => {
    const noteId = req.params.id;

    const note = await Note.findByPk(noteId)
    await note.destroy();
    await NoteTag.destroy({
        where: {
            noteId
        }
    });
    res.status = 204;
    return res.end();
}))

router.post('/:id/tags', requireAuth, asyncHandler(async (req, res) => {
    const noteId = req.params.id;
    const { tagId } = req.body;
    const noteTag = await NoteTag.create({ tagId, noteId });

    return res.json(noteTag)
}))

router.delete('/:noteId/tags/:tagId', requireAuth, asyncHandler(async (req, res) => {
    const { noteId, tagId } = req.params;
    await NoteTag.destroy({
        where: {
            noteId,
            tagId
        } });
        res.status = 204;
    return res.end();
}))

module.exports = router;