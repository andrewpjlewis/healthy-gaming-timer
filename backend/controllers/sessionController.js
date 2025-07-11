const Session = require('../models/Session');

exports.startSession = async (req, res) => {
  try {
    const session = new Session({
      user: req.user.id,
      startTime: new Date()
    });
    await session.save();
    res.status(201).json({ message: 'Session started', sessionId: session._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.endSession = async (req, res) => {
  try {
    const { sessionId } = req.body;
    const session = await Session.findById(sessionId);
    if (!session || session.user.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized or session not found' });
    }

    session.endTime = new Date();
    session.duration = (session.endTime - session.startTime) / 1000; // in seconds
    await session.save();

    res.json({ message: 'Session ended', duration: session.duration });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserSessions = async (req, res) => {
  try {
    const sessions = await Session.find({ user: req.user.id }).sort({ endTime: -1 });
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ New: Delete session
exports.deleteSession = async (req, res) => {
  const { sessionId } = req.params;
  try {
    const deleted = await Session.findOneAndDelete({ _id: sessionId, user: req.user.id });
    if (!deleted) return res.status(404).json({ error: 'Session not found or unauthorized' });

    res.json({ message: 'Session deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};