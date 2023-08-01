const express = require("express"); //imort package and assign to variable
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
dotenv.config(); //import dotenv package

const PORT = process.env.PORT || 8070; //assign port number

app.use(cors()); //use cors
app.use(bodyParser.json()); //use body-parser

const URL = process.env.MONGODB_URL; //assign url to variable

mongoose.connect(URL, {
  //createIndex:true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  //updateOne:false  //connect to the url with these options
});

const connection = mongoose.connection; //assign  mongoose connection to variable
connection.once("open", () => {
  console.log("MongoDB connection success");
}); //create connection to bd one time and check connection

const studentRouter = require("./routes/students"); //import student router

//http://localhost:8070/students if we pass this from backend, it will go to studentRouter and execute the code in studentRouter file and return the response to the frontend
app.use("/students", studentRouter); //use student router

app.listen(PORT, () => {
  console.log(`server is running on port : ${PORT}`);
}); //listen to the port
