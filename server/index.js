



const express = require('express') // import express
const app = express() // create an instance of express
const cors = require('cors') // Cross-Origin Resource Sharing

const jwt = require('jsonwebtoken')  // used to create, sign, and verify tokens
const bcrypt = require('bcryptjs') // bcrypt is used to hash passwords



app.use(cors()) // enable CORS for all requests
app.use(express.json()) // enable json parsing for all requests







app.listen(4000, () => {
	console.log('Server started on 4000')
})

