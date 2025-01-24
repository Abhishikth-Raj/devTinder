const express = require('express');
//creating an instance of express js application, basically creating a web server that runs on express framework
const app = express();
const connectDB = require("./configs/database");
const {userAuth} = require("./middlewares/auth");
const User = require("./models/user");
const {validateSignUpData} = require("./utils/userValidation");
const bcrypt = require("bcrypt");
const validator = require("validator");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
//middleware for JSON to JS conversion of request received to API
app.use(express.json());
app.use(cookieParser());

app.post("/signup", async(req, res)=>{
    //create an instance of the User model
     
    try{
        //1) validate the req.body--------------------------
        validateSignUpData(req);

        const {firstName, lastName, emailId, password} = req.body;

        //2) encrypt passwords------------------------------
        const passwordHash = await bcrypt.hash(password,10); //salting by 10 rounds

        //3) save data to the DB----------------------------
        const user = new User({
            firstName,
            lastName,
            emailId,
            password: passwordHash,
        });
        if(user?.skills.length>15){
            throw new Error("Skills cannot be more than 15");
        }
        await user.save();
        res.send("User is addedd Successfully");
    }catch(err){
        res.status(400).send("SIGN UP ERROR: "+ err.message);
    }
});

//login api
app.post("/login", async(req, res)=>{
    try{
        const{emailId,password} = req.body;
        if(!validator.isEmail(emailId)){
            throw new Error("Invaild Credentials");
        }
        const user = await User.findOne({emailId});
        if(!user){
            throw new Error("Invalid Credentials");
        }
        
        const isPasswordValid = await user.validatePassword(password);
        if(isPasswordValid){
            const token = await user.getJWT();
            //res.cookie('rememberme', '1', { expires: new Date(Date.now() + 900000), httpOnly: true })
            res.cookie("token",token, {httpOnly:true});
            res.send("login successful");
        }else{
            throw new Error("Invalid Credentials");
        }
    }catch(err){
        res.status(400).send("LOGIN Error: "+err.message);
    }
});

//profile api
app.get("/profile", userAuth, async(req, res)=>{
    try{
        const user = req.user;
        res.send(user);
    }catch(err){
        res.status(400).send("ERROR: " + err);
    }
});

app.post("/sendConnectionRequest", userAuth, (req, res)=>{
    const user = req.user;
    console.log("sending a connection request");
    res.send(user.firstName + " sent a connection request");
});

connectDB()
.then(()=>{
    app.listen(7777, ()=>{
        console.log("Server is successfully listening on port 7777");
    });
    console.log("MongoDB Connection Successful");
} 
).catch((err) => {console.log("Database connection failed");});

