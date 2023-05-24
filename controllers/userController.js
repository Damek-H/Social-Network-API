const { User, Thought } = require('../models');

module.exports = {
  getUsers(req, res) {
    User.find()
      .then(users => res.json(users))
      .catch(err => res.status(500).json(err));
  },

  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .then(user =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user),
      )
      .catch(err => res.status(500).json(err));
  },

  createUser(req, res) {
    User.create(req.body)
      .then(dbUserData => {
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then(dbUserData => {
        return !dbUserData
          ? res.status(404).json({ message: 'No user with that ID' })
          : Thought.deleteMany({ _id: { $in: dbUserData.thoughts } });
      })
      .then(() => res.json({ message: 'User and thought deleted!' }))
      .catch(err => res.status(500).json(err));
  },

  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true },
    )
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user with this id!' });
        }
        res.json(dbUserData);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  },

  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { new: true },
    )
      .then(dbUserData => {
        if (!dbUserData) {
          return res.status(404).json({ message: 'No friend with this ID' });
        }
        res.json(dbUserData);
      })
      .catch(err => res.status(500).json(err));
  },

  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true },
    )
      .then(dbUserData =>
        !dbUserData
          ? res.status(404).json({ message: 'No user found with that ID :(' })
          : res.json(dbUserData),
      )
      .catch(err => res.status(500).json(err));
  },
};
