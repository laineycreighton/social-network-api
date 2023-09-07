const mongoose = require("mongoose");
const reactionSchema = require("./Reactions");


const thoughtSchema = new mongoose.Schema(
    {
      thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
      username: {
        type: String,
        required: true,
      },
      reactions: [reactionSchema],
    },
    {
      toJSON: {
        getters: true,
        virtuals: true,
      },
    }
  );
  
  thoughtSchema.virtual("reactionCount").get(function () {
    return this.reactions.length;
  });
  
  const Thought = mongoose.model("Thought", thoughtSchema);
  
  module.exports = Thought;