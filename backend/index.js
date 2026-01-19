const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require('cors');
const AuthRouter = require('./routers/AuthRouter');
const ChatRouter = require('./routers/ChatRouter'); 
const fs = require('fs')

require("dotenv").config();
require('./models/db');

app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

app.use(bodyParser.json());
app.use(cors());


app.use('/auth', AuthRouter);


app.use('/api', ChatRouter); 

app.get("/ping", (req, res) => {
  res.send("Pong");
});

if(!fs.existsSync('./uploads')){
  fs.mkdirSync('./uploads')
}

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});