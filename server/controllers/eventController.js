const { validationResult } = require('express-validator');
const Event = require('../models/Event');

// Create an event
exports.createEvent = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { title, description, date } = req.body;
    
    // Validate date is in the future
    const eventDate = new Date(date);
    const currentDate = new Date();
    
    if (eventDate <= currentDate) {
      return res.status(400).json({ msg: 'Event date must be in the future' });
    }
    
    const newEvent = new Event({
      title,
      description,
      date: eventDate,
      createdBy: req.user.id
    });

    const event = await newEvent.save();
    res.json(event);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get all events
exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find()
      .sort({ date: 1 })
      .populate('createdBy', 'name')
      .populate('attendees', 'name');
    res.json(events);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Register for an event
exports.registerForEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);
    
    if (!event) {
      return res.status(404).json({ msg: 'Event not found' });
    }
    
    // Check if user is already registered
    if (event.attendees.includes(req.user.id)) {
      return res.status(400).json({ msg: 'User already registered for this event' });
    }
    
    // Add user to attendees
    event.attendees.push(req.user.id);
    await event.save();
    
    res.json(event);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Event not found' });
    }
    res.status(500).send('Server Error');
  }
};

// Cancel registration
exports.cancelRegistration = async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);
    
    if (!event) {
      return res.status(404).json({ msg: 'Event not found' });
    }
    
    // Make sure user is registered for the event
    const userIndex = event.attendees.indexOf(req.params.userId);
    
    if (userIndex === -1) {
      return res.status(400).json({ msg: 'User not registered for this event' });
    }
    
    // Remove user from attendees
    event.attendees.splice(userIndex, 1);
    await event.save();
    
    res.json({ msg: 'Registration canceled' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Event not found' });
    }
    res.status(500).send('Server Error');
  }
}; 