const { Schema, model } = require('mongoose');
const myReactionSchema = require('./Reaction');
const dayjs = require('dayjs');

const myThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      get: function (timeStamp) {
        return dayjs(timeStamp).format('DD/MM/YYYY');
      },
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [myReactionSchema],
  },
  {
    toJSON: {
      getters: true,
    },
  },
);

myThoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const MyThought = model('thought', myThoughtSchema);

module.exports = MyThought;
