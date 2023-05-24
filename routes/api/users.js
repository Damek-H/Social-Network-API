const myRouter = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require('../../controllers/userController.js');

myRouter.route('/').get(getUsers).post(createUser);

myRouter.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

myRouter.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = myRouter;
