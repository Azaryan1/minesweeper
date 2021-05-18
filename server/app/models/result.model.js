const mongoose = require('mongoose');

const Result = mongoose.model(
  'Result',
  new mongoose.Schema(
    {
      username: { type: String, required: true },
      time: { type: Number, required: true },
      level: { type: String, required: true },
      isWin: { type: Boolean, required: true },
    },
    { timestamps: true }
  )
);

module.exports = Result;
