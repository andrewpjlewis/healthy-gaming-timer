const express = require('express');
const router = express.Router();
const { getGoals, updateGoal, createGoal } = require('../controllers/goalController');
const { verifyToken } = require('../middleware/middleware');

router.get('/', verifyToken,
  /*
    #swagger.tags = ['Goals']
    #swagger.summary = 'Get all health goals for the authenticated user'
    #swagger.responses[200] = {
      description: 'List of goals',
      schema: [{ $ref: '#/definitions/Goal' }]
    }
  */
  getGoals
);

router.post('/', verifyToken,
  /*
    #swagger.tags = ['Goals']
    #swagger.summary = 'Create a new health goal'
    #swagger.parameters['obj'] = {
      in: 'body',
      description: 'Goal info',
      required: true,
      schema: { title: "Take breaks regularly", target: 5 }
    }
    #swagger.responses[201] = {
      description: 'Goal created successfully',
      schema: { $ref: '#/definitions/Goal' }
    }
  */
  createGoal
);

router.put('/:goalId', verifyToken,
  /*
    #swagger.tags = ['Goals']
    #swagger.summary = 'Update progress of a health goal'
    #swagger.parameters['goalId'] = {
      in: 'path',
      description: 'ID of goal to update',
      required: true,
      type: 'string'
    }
    #swagger.parameters['obj'] = {
      in: 'body',
      description: 'Progress update',
      required: true,
      schema: { progress: 2 }
    }
    #swagger.responses[200] = {
      description: 'Goal updated successfully',
      schema: { $ref: '#/definitions/Goal' }
    }
    #swagger.responses[404] = { description: 'Goal not found' }
  */
  updateGoal
);

module.exports = router;
