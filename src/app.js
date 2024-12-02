const express = require('express');

//creating an instance of express js application, basically creating a web server that runs on express framework
const app = express();

const connectDB = require("./configs/database");
const {adminAuth, userAuth} = require("./middlewares/auth");
const User = require("./models/user");

//middleware for JSON to JS conversion of request received to API
app.use(express.json());
app.post("/signup", async(req, res)=>{
    //create an instance of the User model
    console.log(req.body);
    const user = new User(req.body);

    try{
        await user.save();
        res.send("User is addedd Successfully");
    }catch(err){
        res.status(400).send("Bad Request");
        console.log(err);
    }
});

connectDB()
.then(()=>{
    app.listen(7777, ()=>{
        console.log("Server is successfully listening on port 7777");
    });
    console.log("MongoDB Connection Successful");
} 
).catch((err) => {console.log("Database connection failed");});

