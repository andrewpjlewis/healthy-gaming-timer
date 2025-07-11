const express = require('express');
const router = express.Router();

const { verifyToken } = require('../middleware/middleware');
const {
  startSession,
  endSession,
  getUserSessions
} = require('../controllers/sessionController');

// Start a new session
router.post('/start', verifyToken,
  /*
    #swagger.tags = ['Session']
    #swagger.summary = 'Start a gaming session'
    #swagger.security = [{ bearerAuth: [] }]
    #swagger.responses[200] = { description: 'Session started' }
  */
  startSession
);

// End an existing session
router.post('/end', verifyToken,
  /*
    #swagger.tags = ['Session']
    #swagger.summary = 'End a gaming session'
    #swagger.security = [{ bearerAuth: [] }]
    #swagger.responses[200] = { description: 'Session ended' }
  */
  endSession
);

// Get all sessions for the logged-in user
router.get('/', verifyToken,
  /*
    #swagger.tags = ['Session']
    #swagger.summary = 'Get sessions for current user'
    #swagger.security = [{ bearerAuth: [] }]
    #swagger.responses[200] = { description: 'List of sessions' }
  */
  getUserSessions
);

module.exports = router;