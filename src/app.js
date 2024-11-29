const express = require('express');

//creating an instance of express js application, basically creating a web server that runs on express framework
const app = express();

const {adminAuth, userAuth} = require("./middleware/auth");
//middlewares - the intemediate callback functions before the final call back (which is called the actual request handler)
app.use("/admin", adminAuth);

app.get("/admin/getAllData", (req,res)=>{
    res.send("All User data sent");
});

app.get("/admin/deleteData", (req,res)=>{
    res.send("User Deleted");
});

//as the login itself is authentication process we need not check if user is logged in here
//hence the login middleware comes before the authentication check middleware
app.use("/user/login", (req,res)=>{
    //user login method usin try catch method (best practice)
    res.send("User logged in"); 
});

app.use("/user/data",userAuth, (req,res)=>{
    throw new Error("asdfas");
    res.send("user data");
});

app.use("/", (err, req, res, next)=>{ //only works when err is present
    //even if this code is present before all mws, there would not be a 
    //problem for an err is required to execute this.
    //if no error it will not get executed or effect other routes
    // exept the home route;
    if(err){
        console.log(err);
        res.status(500).send("something went wrong");
    }
    //res.send("home route");
});

app.listen(7777, ()=>{
    console.log("Server is successfully listening on port 7777");
});//server listens for requests

