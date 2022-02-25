const mongoose = require("mongoose");
//* Creating Schema
//? Here we create anew Schema obj and pass in all the "columns" that we want to our table on our database to store
const articleSchema = new mongoose.Schema({
  title: {
    required: true,
    type: String,
  },
  description: {
    type: String,
  },
  markdown: {
    required: true,
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Article", articleSchema);
