const express = require('express');
const UserController = require('../controllers/userController');
const router = express.Router();

router.get('/:id', UserController.authMiddleWare, UserController.getUser);

router.post('/auth', UserController.auth);

router.post('/register', UserController.register);

module.exports = router;