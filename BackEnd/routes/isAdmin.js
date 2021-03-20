const express = require('express');
const adminController = require('../controllers/isAdmin');
//const auth = require('../middleware/auth');
const admin = require('../middleware/isAdmin');

const router = express.Router();

router.put('/isadmin/:id', admin, adminController.becomeAdmin);
router.put('/isnotadmin/:id', admin, adminController.stopAdmin);
router.delete('/:id', admin, adminController.deleteUser);

module.exports = router;