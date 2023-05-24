const { Schema, Types } = require('mongoose');
const dayjs = require('dayjs');

const myReactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: function (timeStamp) {
        return dayjs(timeStamp).format('DD/MM/YYYY');
      },
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  },
);

module.exports = myReactionSchema;
