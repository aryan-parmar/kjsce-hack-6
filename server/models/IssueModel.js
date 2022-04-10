const mongoose = require("mongoose"); // mongoose is used to connect to the database

const issue = new mongoose.Schema( // create a new schema which is used to create a new collection in the database
  {
    location: { type: String, required: true }, // name of the user
    issueDesc: { type: String, required: true }, // email of the user
    user: { type: String, required: true }, // password of the user
    issues: { type: Array },
    anonymous: { type: Boolean }, // issues of the user
  },
  { collection: "issue" } // name of the collection
);

const model = mongoose.model("issueData", issue); // create a new model from the schema

module.exports = model; // export the model
