const express = require('express');
const messageController = require('../controllers/message');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-message-config');

const router = express.Router();

router.post('/', auth, multer, messageController.createMessage);
router.get('/', auth, messageController.getAllMessages);
router.delete('/:id', auth, multer, messageController.deleteMessage);

module.exports = router;

