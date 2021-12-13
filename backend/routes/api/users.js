const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Note, Notebook, Tag } = require('../../db/models');

const router = express.Router();

const validateSignup = [
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please provide a valid email.'),
    check('username')
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email.'),
    check('firstName')
        .exists({ checkFalsy: true })
        .isLength({ min: 1 })
        .withMessage('First name is required.'),
    check('lastName')
        .exists({ checkFalsy: true })
        .isLength({ min: 1 })
        .withMessage('Last name is required.'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
];

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

const validateNotebook = [
    check('name')
        .exists({ checkFalsy: true })
        .isLength({ min: 1 })
        .withMessage('Please provide a title for the note.'),
    handleValidationErrors
];

router.post('/', validateSignup, asyncHandler(async(req, res) => {
    const { email, password, username, firstName, lastName } = req.body;
    const user = await User.signup({ email, username, password, firstName, lastName });

    await setTokenCookie(res, user);

    return res.json({ user })
}))

router.put('/:id', validateSignup, asyncHandler(async (req, res, next) => {
    const id = req.params.id
    const { email, password, username, firstName, lastName } = req.body;
    const user = await User.findByPk(id);
    const oldUser = await User.login({ credential: user.username, password: password })

    if (!oldUser) {
        const err = new Error('Password failed');
        err.status = 401;
        err.title = 'Password failed';
        err.errors = ['The provided password was incorrect.'];
        return next(err);
    }

    const updatedUser = await oldUser.update({ email, username, firstName, lastName });

    await setTokenCookie(res, updatedUser);

    return res.json({ updatedUser });
}))

router.delete('/:id', asyncHandler(async (req, res, next) => {
    const id = req.params.id
    const user = await User.findByPk(id);
    const { password, username } = req.body;
    const oldUser = await User.login({ credential: user.username, password: password })

    if (!oldUser) {
        const err = new Error('Password failed');
        err.status = 401;
        err.title = 'Password failed';
        err.errors = ['The provided password was incorrect.'];
        return next(err);
    }
    await Tag.destroy({
        where: {
            userId: user.id
        }
    })
    await Note.destroy({
        where: {
            userId: user.id
        }
    })
    await Notebook.destroy({
        where: {
            userId: user.id
        }
    })
    await user.destroy();

    res.clearCookie('token');
    return res.json({ message: 'success' })
}))

router.get('/:id/notes', requireAuth, asyncHandler(async (req, res) => {
    const userId = req.params.id;
    const notes = await Note.findAll({ order: [['updatedAt', 'DESC']], where: { userId }  });

    return res.json(notes);
}))

router.post('/:id/notes', requireAuth, validateNote, asyncHandler(async (req, res) => {
    const { name, content, userId, notebookId } = req.body;
    const newNote = await Note.create({ name, content, userId, notebookId });
    
    return res.json(newNote);
}))

router.get('/:id/notebooks', requireAuth, asyncHandler(async (req, res) => {
    const userId = req.params.id
    const notebooks = await Notebook.findAll({ order: [['updatedAt', 'DESC']], where: { userId }, include: Note });

    return res.json(notebooks)
}))

router.post('/:id/notebooks', requireAuth, validateNotebook, asyncHandler(async (req, res) => {
    const userId = req.params.id;
    const { name } = req.body;
    const notebook = await Notebook.create({ name, userId });

    return res.json(notebook)
}))

router.get('/:id/notebooks/:notebookId/notes', requireAuth, asyncHandler(async (req, res) => {
    const { id: userId, notebookId } = req.params
    
    const notes = await Note.findAll({ where: { userId, notebookId } });

    return res.json(notes)
}))

router.put('/:id/notebooks/:notebookId', requireAuth, validateNotebook, asyncHandler(async (req, res) => {
    const { notebookId } = req.params;
    const { name } = req.body;
    const notebook = await Notebook.findByPk(notebookId);

    const updatedNotebook = await notebook.update({ name });

    return res.json(updatedNotebook)
}))

router.delete('/:id/notebooks/:notebookId', requireAuth, asyncHandler(async (req, res) => {
    const { notebookId } = req.params
    const notebook = await Notebook.findByPk(notebookId);
    const notes = await Note.update({ notebookId: null }, {where: { notebookId }});

    const deletedNotebook = await notebook.destroy();

    return res.json(deletedNotebook)
}))

module.exports = router;