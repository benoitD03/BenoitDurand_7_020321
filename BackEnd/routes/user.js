const express = require('express');
const userController = require('../controllers/user');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-user-config');

const router = express.Router();

router.post('/signup', multer, userController.signup);
router.post('/login', userController.login);
router.get('/me', auth, userController.getUserProfile);
router.get('/all', auth, userController.getAllUsers);
router.put('/me', auth, multer, userController.modifyUser);
router.delete('/:id', auth, multer, userController.deleteUser);

module.exports = router;
