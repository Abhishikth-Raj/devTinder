const express = require('express');

//creating an instance of express js application, basically creating a web server that runs on express framework
const app = express();

//request handlers
app.get("/user", (req,res)=>{
    res.send({methodNroute: "app.get and user route", firstName : "Abhi", lastName : "N"});
});

app.post("/user", (req, res)=>{
    res.send("User created Successfully");
});
app.patch("/user",(req,res)=>{
    res.send("user modified successfully");
});
app.delete("/user",(req, res)=>{
    res.send("user deleted successfully");
});

app.use("/test", (req, res)=>{
    res.send("API Response: .use and test route");
});
app.listen(7777, ()=>{
    console.log("Server is successfully listening on port 7777");
});//server listens for requests

