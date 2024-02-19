require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();


const dbURI = process.env.MONGODB_URI;
mongoose
  .connect(dbURI)
  .then((result) => console.log("Connected to db"))
  .catch((err) => console.log(err));


const PORT = process.env.PORT || 3000;



app.get('/', (req, res)=>{ 
    res.status(200); 
    res.send("Welcome to root URL of Server"); 
}); 



app.listen(PORT, (error) =>{ 
    if(!error) 
        console.log(`Server is Successfully Running, and App is listening on port ${PORT}`) 
    else 
        console.log("Error occurred, server can't start", error); 
    } 
); 
  