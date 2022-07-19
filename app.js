const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require('dotenv').config()
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");

//Middleware
const app = express();
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
   extended: true}));

//DB connection
var uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser : true , useUnifiedTopology: true}, ()=>{
    console.log("The DB is connected!");
});


// Routes
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);



app.listen(5000,()=>{
    console.log(`The server is running at port 5000`);
})