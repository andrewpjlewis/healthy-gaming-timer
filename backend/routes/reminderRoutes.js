const express = require('express');
const router = express.Router();
const { getReminders, createOrUpdateReminder } = require('../controllers/reminderController');
const { verifyToken } = require('../middleware/middleware');

router.get('/', verifyToken,
  /*
    #swagger.tags = ['Reminders']
    #swagger.summary = 'Get all reminders for the authenticated user'
    #swagger.responses[200] = {
      description: 'List of reminders',
      schema: [{ $ref: '#/definitions/Reminder' }]
    }
  */
  getReminders
);

router.post('/', verifyToken,
  /*
    #swagger.tags = ['Reminders']
    #swagger.summary = 'Create or update a reminder'
    #swagger.parameters['obj'] = {
      in: 'body',
      description: 'Reminder details',
      required: true,
      schema: { type: "break", frequency: 15, status: "active" }
    }
    #swagger.responses[200] = {
      description: 'Reminder created or updated',
      schema: { $ref: '#/definitions/Reminder' }
    }
  */
  createOrUpdateReminder
);

module.exports = router;
