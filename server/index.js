const express = require("express"); // import express
const app = express(); // create an instance of express
const cors = require("cors"); // Cross-Origin Resource Sharing
const mongoose = require("mongoose"); // import mongoose
const User = require("./models/userModel"); // import user model
const Issue = require("./models/issueModel"); // import user model
const Geolocation = require("./models/geolocation"); // import user model
const jwt = require("jsonwebtoken"); // used to create, sign, and verify tokens
const bcrypt = require("bcryptjs"); // bcrypt is used to hash passwords
mongoose.set("useNewUrlParser", true); // set mongoose to use new parser instead of deprecated parser
mongoose.set("useFindAndModify", false); // set mongoose to not use the findAndModify function
mongoose.set("useCreateIndex", true); // set mongoose to use createIndex instead of deprecated ensureIndex
app.use(cors()); // enable CORS for all requests
app.use(express.json()); // enable json parsing for all requests
mongoose.connect("mongodb://localhost:27017/Yugma"); // connect to mongoDB database

app.post("/api/register", async (req, res) => {
  // register a new user
  console.log(req.body); // log the request body
  try {
    const newPassword = await bcrypt.hash(req.body.password, 10); // hash the password
    await User.create({
      // create a new user
      name: req.body.name,
      email: req.body.email,
      password: newPassword,
    });
    res.json({ status: "ok" }); // send a response with status ok
  } catch (err) {
    res.json({ status: "error", error: "Duplicate email" }); // send a response with status error and error message
  }
});

app.post("/api/login", async (req, res) => {
  // login a user
  console.log(req.body); // log the request body
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
        name: user.name, // with the name and email of the user
        email: user.email,
      },
      "secret123" // with a secret
    );
    return res.json({ status: "ok", user: token }); // send a response with status ok and the token
  } else {
    return res.json({ status: "error", user: false }); // send an error response with status error and user false
  }
});
app.post("/api/userLoginStat", async (req, res) => {
  const token = req.headers["x-access-token"];
  try {
    const decoded = jwt.verify(token, "secret123");
    const email = decoded.email;
    a = { email: "", name: "" };
    const user = await User.findOne({ email: email });
    a["email"] = user.email;
    a["name"] = user.name;
    res.json({ status: "ok", user: a });
  } catch (error) {
    res.json({ status: "error", error: "invalid token" });
  }
});
app.post("/api/search", async (req, res) => {
  let search = req.body.value;
  console.log(search);
  const locations = await Geolocation.find({
    name: { $regex: "^" + req.body.value.toLowerCase() },
  });
  console.log(locations);
  res.json({ status: "ok", locations: locations });
});
app.post("/api/addissue", async (req, res) => {
  const token = req.headers["x-access-token"];
  try {
    const decoded = jwt.verify(token, "secret123");
    const email = decoded.email;
    const user = await User.findOne({ email: email });
    let location = req.body.location;
    let issue = req.body.issue;
    let issueDesc = req.body.issueDesc;
    let anonymous = req.body.anonymous;
    console.log(location, issue, issueDesc, anonymous);
    Geolocation.findOne({ name: location }, (err, location) => {
      if (err) {
        console.log(err);
      }
      if (location) {
        console.log(location);
        Issue.create({
          location: location._id,
          issue: issue,
          issueDesc: issueDesc,
          user: user._id,
          anonymous: anonymous,
        });
        location.issue = location.issue+ 1
        location.save();
        res.json({ status: "ok" });
      } else {
        res.json({ status: "error", error: "Location not found" });
      }
    })
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "invalid token" });
  }
});
app.post("/api/getlocation", async (req, res) => {
  const location = await Geolocation.find({});
  return res.json({ status: "ok", data: location });
});
app.listen(4000, () => {// listen on port 4000
  console.log("Server started on 4000");
});
