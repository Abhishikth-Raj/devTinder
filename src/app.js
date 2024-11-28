const express = require('express');

//creating an instance of express js application, basically creating a web server that runs on express framework
const app = express();

//request handlers
app.get("/user", (req,res)=>{
        console.log(req.query);
    res.send(
        {
            firstName : "Abhi", 
            lastName : "N"
        });
});

app.get("/user1/:userId/:name/:password", (req,res)=>{
        console.log(req.params);
    res.send(
        {
            firstName : "Abhi", 
            lastName : "N"
        });
});

//Advanced routing techniques - again here the sequence matters
app.get("/ab?c",(req,res)=>{
    res.send("b in the url path is optional");
});

app.get("/ab+c",(req,res)=>{
    res.send("b in the url can be repeated any number of times, path should start and end with a & c respectively");
});

app.get("/a(bc)?d",(req, res)=>{
    res.send("bc together is optional");
});

//regex
app.get(/a/, (req, res)=>{
    res.send("any path that contains 'a' works");
});

app.get(/.*fly$/,(req, res)=>{
    res.send("any path thta ends with fly works");
});


app.listen(7777, ()=>{
    console.log("Server is successfully listening on port 7777");
});//server listens for requests

