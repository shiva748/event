const User = require('../models/User');
const Event = require('../models/Event');

// Get user's registered events
exports.getUserEvents = async (req, res) => {
  try {
    const userId = req.params.userId;
    
    // Verify the requesting user is the same as the userId or implement admin check
    if (req.user.id !== userId) {
      return res.status(401).json({ msg: 'Not authorized' });
    }
    
    // Get events where user is an attendee
    const registeredEvents = await Event.find({ attendees: userId })
      .sort({ date: 1 })
      .populate('createdBy', 'name');
      
    // Get events created by user
    const createdEvents = await Event.find({ createdBy: userId })
      .sort({ date: 1 })
      .populate('createdBy', 'name');
    
    // Combine the events, ensuring no duplicates
    const combinedEvents = [...registeredEvents];
    
    // Add created events that aren't already in the array
    createdEvents.forEach(createdEvent => {
      const eventExists = combinedEvents.some(event => 
        event._id.toString() === createdEvent._id.toString()
      );
      
      if (!eventExists) {
        combinedEvents.push(createdEvent);
      }
    });
    
    // Sort by date
    combinedEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
      
    res.json(combinedEvents);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}; 