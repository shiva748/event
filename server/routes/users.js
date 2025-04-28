const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const userController = require('../controllers/userController');

// GET /api/users/:userId/events - Get user's registered events
router.get('/:userId/events', auth, userController.getUserEvents);

module.exports = router; 