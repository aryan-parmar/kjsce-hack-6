const mongoose = require('mongoose')                             // mongoose is used to connect to the database

const User = new mongoose.Schema(                              // create a new schema which is used to create a new collection in the database
{
    name: { type: String, required: true },                  // name of the user
    email: { type: String, required: true, unique: true },  // email of the user
    password: { type: String, required: true },            // password of the user 
    issues: { type: Array },                              // issues of the user
},   
{ collection: 'user-data' }                             // name of the collection
)    

const model = mongoose.model('UserData', User)       // create a new model from the schema

module.exports = model                             // export the model
 

