const User = require('../models/User');
const Session = require('../models/Session');
const Goal = require('../models/Goal');

exports.deleteAccount = async (req, res) => {
  try {
    const userId = req.user.id;
    // Delete user’s sessions and goals first
    await Session.deleteMany({ user: userId });
    await Goal.deleteMany({ user: userId });
    await User.findByIdAndDelete(userId);
    res.json({ message: 'Account deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};