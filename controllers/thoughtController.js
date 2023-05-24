const { User, Thought } = require('../models');

const myThoughtController = {
  getThoughts(req, res) {
    Thought.find()
      .sort({ createdAt: -1 })
      .then(dbThoughtData => {
        res.json(dbThoughtData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .then(thought => {
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(thought);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  },

  createThought(req, res) {
    Thought.create({
      thoughtText: req.body.thoughtText,
      username: req.body.username,
    })
      .then(dbThoughtData => {
        User.findOne({ _id: req.body.userId }).then(user => {
          if (!user) {
            return res.status(404).json({ message: 'No user with that ID' });
          } else {
            user.thoughts.push(dbThoughtData.id);
          }
        });
        res.json(dbThoughtData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true },
    )
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought with this id!' });
        }
        res.json(dbThoughtData);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  },

  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          return res
            .status(404)
            .json({ message: 'No thought found with that ID :(' });
        }
        res.json({ message: 'Thought was succesfully deleted!' });
      })
      .catch(err => res.status(500).json(err));
  },

  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true },
    )
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          return res.status(404).json({ message: 'No reaction with this ID' });
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.status(500).json(err));
  },

  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true },
    )
      .then(dbThoughtData =>
        !dbThoughtData
          ? res.status(404).json({ message: 'No user found with that ID :(' })
          : res.json(dbThoughtData),
      )
      .catch(err => res.status(500).json(err));
  },
};

module.exports = myThoughtController;
