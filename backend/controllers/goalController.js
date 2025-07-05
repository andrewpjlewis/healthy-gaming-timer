const Goal = require('../models/Goal');

exports.createGoal = async (req, res) => {
  const { title, target } = req.body;

  if (!title || !target) {
    return res.status(400).json({ error: 'Title and target are required' });
  }

  try {
    const newGoal = new Goal({
      user: req.user.id,
      title,
      target,
      progress: 0,
      completed: false
    });
    await newGoal.save();
    res.status(201).json(newGoal);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getGoals = async (req, res) => {
  try {
    const goals = await Goal.find({ user: req.user.id });
    res.json(goals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateGoal = async (req, res) => {
  const { goalId } = req.params;
  const { progress } = req.body;

  try {
    const goal = await Goal.findOne({ _id: goalId, user: req.user.id });
    if (!goal) return res.status(404).json({ error: 'Goal not found' });

    goal.progress = progress;
    if (goal.progress >= goal.target) goal.completed = true;
    await goal.save();

    res.json(goal);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};