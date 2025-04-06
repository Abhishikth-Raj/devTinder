const express = require("express");
const authRouter = express.Router();
const {validateSignUpData} = require("../utils/validation");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const validator = require("validator");

authRouter.post("/signup", async(req, res)=>{
    //create an instance of the User model
     console.log(req.body);
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
authRouter.post("/login", async(req, res)=>{
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
            res.send(user);
        }else{
            throw new Error("Invalid Credentials");
        }
    }catch(err){
        res.status(400).send("LOGIN Error: "+err.message);
    }
});

authRouter.post("/logout", async(req, res)=>{
    try{
        //clean up and set the token to null.
        res.cookie("token", null,{
            expires: new Date(Date.now()),
        });
        res.send("Logout successful");
    }catch(err){
        res.status(400).send("LOGOUT ERROR : "+ err.message);
    }
});

module.exports = authRouter;