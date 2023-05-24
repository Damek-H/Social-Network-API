const myRouter = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require('../../controllers/thoughtController');

myRouter.route('/').get(getThoughts).post(createThought);

myRouter
  .route('/:thoughtId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

myRouter.route('/:thoughtId/reactions').post(addReaction);

myRouter.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = myRouter;
