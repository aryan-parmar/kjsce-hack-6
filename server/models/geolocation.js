const mongoose = require("mongoose"); // mongoose is used to connect to the database

const geolocation = new mongoose.Schema( // create a new schema which is used to create a new collection in the database
  {
    name: { type: String, required: true }, // name of the user
    location: { type: Array },
    issue: { type: Number }, // issues of the user
  },
  { collection: "geolocation" } // name of the collection
);

const model = mongoose.model("geolocation", geolocation); // create a new model from the schema

module.exports = model; // export the model
