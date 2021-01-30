const express = require('express');
const apiRouter = express.Router();
const minionRouter = require('./minionRouter.js');
const ideasRouter = require('./ideasRouter.js');
const meetingsRouter = require('./meetingsRouter.js');

apiRouter.use('/minions', minionRouter);
apiRouter.use('/ideas', ideasRouter);
apiRouter.use('/meetings', meetingsRouter);

module.exports = apiRouter;
