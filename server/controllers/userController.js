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
    
    const events = await Event.find({ attendees: userId })
      .sort({ date: 1 })
      .populate('createdBy', 'name');
      
    res.json(events);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}; 