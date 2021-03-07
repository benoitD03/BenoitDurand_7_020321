const admin = require('../middleware/admin');
const express = require('express');
const adminController = require('../controllers/isAdmin');
const router = express.Router();

router.delete('/api/messages/:id', admin, adminController.deleteMessage);
router.delete('/api/users/:id', admin, adminController.deleteUser);

module.exports = router;