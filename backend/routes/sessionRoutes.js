const express = require('express');
const router = express.Router();

const { verifyToken } = require('../middleware/middleware');
const { startSession, endSession } = require('../controllers/sessionController');

router.post('/start', verifyToken,
  /*
    #swagger.tags = ['Session']
    #swagger.summary = 'Start a gaming session'
    #swagger.responses[200] = { description: 'Session started' }
  */
  startSession
);

router.post('/end', verifyToken,
  /*
    #swagger.tags = ['Session']
    #swagger.summary = 'End a gaming session'
    #swagger.responses[200] = { description: 'Session ended' }
  */
  endSession
);

module.exports = router;
