const myRouter = require('express').Router();
const myApiRoutes = require('./api');

myRouter.use('/api', myApiRoutes);

myRouter.use((req, res) => res.send('Invalid route!'));

module.exports = myRouter;
