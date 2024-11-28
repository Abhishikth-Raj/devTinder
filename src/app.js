const express = require('express');

//creating an instance of express js application, basically creating a web server that runs on express framework
const app = express();


//Multiple route handlers - play
app.use("/user", [
    (req, res, next)=>{
        console.log("callback 1 is invoked");
        next(); 
        // res.send("Response 1");
    },
    (req, res, next) =>{
        console.log("callback 2 is invoked");
        next();
    }
    ],
    (req, res, next) =>{
        console.log("callback 3 is invoked");
        res.send("resp3");
    }
);

app.listen(7777, ()=>{
    console.log("Server is successfully listening on port 7777");
});//server listens for requests

