const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const auth = require('../middleware/auth');
const eventController = require('../controllers/eventController');

// POST /api/events - Create event
router.post(
  '/',
  [
    auth,
    [
      check('title', 'Title is required').not().isEmpty(),
      check('description', 'Description is required').not().isEmpty(),
      check('date', 'Date is required').not().isEmpty()
    ]
  ],
  eventController.createEvent
);

// GET /api/events - Get all events
router.get('/', eventController.getEvents);

// POST /api/events/:eventId/register - Register for event
router.post('/:eventId/register', auth, eventController.registerForEvent);

// DELETE /api/events/:eventId/cancel/:userId - Cancel registration
router.delete('/:eventId/cancel/:userId', auth, eventController.cancelRegistration);

module.exports = router; 