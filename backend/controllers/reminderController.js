const Reminder = require('../models/Reminder');

exports.getReminders = async (req, res) => {
  try {
    const reminders = await Reminder.find({ user: req.user.id });
    res.json(reminders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createOrUpdateReminder = async (req, res) => {
  const { type, frequency, isActive } = req.body;
  try {
    const reminder = await Reminder.findOneAndUpdate(
      { user: req.user.id, type },
      { frequency, isActive },
      { upsert: true, new: true }
    );
    res.status(200).json(reminder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};