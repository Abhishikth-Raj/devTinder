const express = require('express');

//creating an instance of express js application, basically creating a web server that runs on express framework
const app = express();

const connectDB = require("./configs/database");
const {adminAuth, userAuth} = require("./middlewares/auth");
const User = require("./models/user");

//middleware for JSON to JS conversion of request received to API
app.use(express.json());

//find User by email id or user name
app.get("/user", async(req, res)=>{
    const userEmail = req.body.emailId;
    const username  = req.body.username;
   try{
        const user = await User.findOne({emailId: userEmail});
        if(!user){
            res.status(404).send("user not found");
        }else{
            res.send(user);
        }
    }catch(err){
        res.status(404).send("Something went wrong");
    }
});

//find all users /feed page
app.get("/feed", async(req, res)=>{
    try{
        const allUsers = await User.find({});
        
        if(allUsers.length===0){
            res.status(400).send("no users found");
        }else{
            res.send({allUsers});
        }
    }catch(err){
        res.status(404).send(err);
    }
});

app.post("/signup", async(req, res)=>{
    //create an instance of the User model
    console.log(req.body);
    const user = new User(req.body);
     if(user?.skills.length>15){
            throw new Error("Skills cannot be more than 15");
        }
    try{
        await user.save();
        res.send("User is addedd Successfully");
    }catch(err){
        res.status(400).send("CREATE FAILED: "+ err.message);
    }
});

//delete a user from the DB
app.delete("/user", async(req, res)=>{
    const userId = req.body.userId;
    try {
        const user = await User.findByIdAndDelete({_id: userId});
        res.send("User deleted successfully");
    }catch(err){
        res.status(400).send("Something went wrong");
    }
});

// //update user data with email, (now email and user id cannot be changed in the user data with this request)
// app.patch("/user", async(req, res)=>{
//     try{
//         const emailId = req.body.emailId;
//         const data = req.body;
//         //id cannot be updated
//         //new data cannot be added like skills, since it is not present in schema
//         const user = await User.findOneAndUpdate({emailId},data, {
//             returnDocument: "after",
//             runValidators: true,
//         });
//         //default option is before object
//         console.log(user);
//         res.send("User updated successfully");
//     }catch(err){
//         res.status(400).send("UPDATE FAILED: " + err.message);
//         console.log(err);
//     }
// });


//update a user using user id with patch. user id in request params
app.patch("/user/:userId", async(req, res)=>{
    try{
        const userId = req.params?.userId;
        const data = req.body;
        const ALLOWED_UPDATES = [
            "firstName","lastName","photoUrl","about","gender","age","skills"
        ];
        const isUpdateAllowed = Object.keys(data).every((k)=>
            ALLOWED_UPDATES.includes(k)
        );
        if(!isUpdateAllowed){
            throw new Error("Update not allowed");
        }
        if(data?.skills.length>15){
            throw new Error("Skills cannot be more than 15");
        }
        //id cannot be updated
        //new data cannot be added like skills, since it is not present in schema
        const user = await User.findByIdAndUpdate({_id: userId},data, {
            returnDocument: "after",
            runValidators: true,
        });
        //default option is before object
        //console.log(user);
        if(user === null){
            throw new Error ("User id does not exist");
        }
        res.send("User updated successfully");
    }catch(err){
        res.status(400).send("UPDATE FAILED: " + err.message);
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

