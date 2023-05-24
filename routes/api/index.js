const myRouter = require('express').Router();
const myUserRoutes = require('./users');
const myThoughtRoutes = require('./thoughts');

myRouter.use('/users', myUserRoutes);
myRouter.use('/thoughts', myThoughtRoutes);

module.exports = myRouter;
