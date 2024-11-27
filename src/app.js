const express = require('express');

//creating an instance of express js application, basically creating a web server that runs on express framework
const app = express();

//request handler
app.use((req, res)=>{
    res.send("Hello from the server!");
});

app.listen(3000, ()=>{
    console.log("Server is successfully listening on port 3000");
});//server listens for requests

