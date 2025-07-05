const Session = require('../models/Session'); // make sure this path is correct

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