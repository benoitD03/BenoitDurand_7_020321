const express = require('express');
const messageController = require('../controllers/message');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/', auth, messageController.createMessage);

module.exports = router;

