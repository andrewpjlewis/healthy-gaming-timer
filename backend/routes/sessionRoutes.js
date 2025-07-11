const express = require('express');
const router = express.Router();

const { verifyToken } = require('../middleware/middleware');
const {
  startSession,
  endSession,
  getUserSessions,
  deleteSession // ✅ new import
} = require('../controllers/sessionController');

router.post('/start', verifyToken,
  /*
    #swagger.tags = ['Session']
    #swagger.summary = 'Start a gaming session'
  */
  startSession
);

router.post('/end', verifyToken,
  /*
    #swagger.tags = ['Session']
    #swagger.summary = 'End a gaming session'
  */
  endSession
);

router.get('/', verifyToken,
  /*
    #swagger.tags = ['Session']
    #swagger.summary = 'Get sessions for current user'
  */
  getUserSessions
);

router.delete('/:sessionId', verifyToken,
  /*
    #swagger.tags = ['Session']
    #swagger.summary = 'Delete a session'
    #swagger.parameters['sessionId'] = {
      in: 'path',
      required: true,
      type: 'string'
    }
  */
  deleteSession
);

module.exports = router;