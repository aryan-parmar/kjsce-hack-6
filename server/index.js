const express = require("express");               // import express
const app = express();                            // create an instance of express
const cors = require("cors");                    // Cross-Origin Resource Sharing
const mongoose = require("mongoose");           // import mongoose
const User = require("./models/userModel");   // import user model

const jwt = require("jsonwebtoken");         // used to create, sign, and verify tokens
const bcrypt = require("bcryptjs");         // bcrypt is used to hash passwords

mongoose.set("useNewUrlParser", true);    // set mongoose to use new parser instead of deprecated parser
mongoose.set("useFindAndModify", false); // set mongoose to not use the findAndModify function
mongoose.set("useCreateIndex", true);   // set mongoose to use createIndex instead of deprecated ensureIndex

app.use(cors());                      // enable CORS for all requests
app.use(express.json());             // enable json parsing for all requests

mongoose.connect("mongodb://localhost:27017/Yugma");   // connect to mongoDB database

app.post("/api/register", async (req, res) => {
                                                    // register a new user
  console.log(req.body);                           // log the request body
  try {
    const newPassword = await bcrypt.hash(req.body.password, 10);   // hash the password
    await User.create({
                                                                   // create a new user
      name: req.body.name,
      email: req.body.email,
      password: newPassword,
    });
    res.json({ status: "ok" });             // send a response with status ok
  } catch (err) {
    // catch any errors
    res.json({ status: "error", error: "Duplicate email" }); // send a response with status error and error message
  }
});

app.post("/api/login", async (req, res) => {
  // login a user
  const user = await User.findOne({
    // find the user
    email: req.body.email, // with the email in the request body
  });
  if (!user) {
    // if no user is found
    return res.json({ status: "error", error: "Invalid login", user: false }); // send an error response
  }

  const isPasswordValid = await bcrypt.compare(
    // compare the password in the request body with the hashed password in the database
    req.body.password, // with the password in the database
    user.password // with the password in the database
  );

  if (isPasswordValid) {
    // if the password is valid
    const token = jwt.sign(
      // create a token
      {
        name: user.name,                                    // with the name and email of the user
        email: user.email,
      },
      "secret123"                                         // with a secret
    );

    return res.json({ status: "ok", user: token });     // send a response with status ok and the token
  } else {
    return res.json({ status: "error", user: false }); // send an error response with status error and user false
  }
});
app.listen(4000, () => {                                                 // listen on port 4000
  console.log("Server started on 4000");                                // log that the server started
});                                                                    // end listen    
                                                                       
