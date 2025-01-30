const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
const user = express.Router();
const USER_SAFE_DATA = ["firstName", "lastName", "photoUrl", "age", "gender", "skills", "about"]; 
//GET api for getting the pending requests of the user
user.get("/user/requests/received", userAuth, async(req, res)=>{
    try{
        const loggedInUser = req.user;

        const connectionRequests = await ConnectionRequest.find({
            toId: loggedInUser._id,
            status: "interested",
        }).populate("fromId",USER_SAFE_DATA);

        if(!connectionRequests){
            res.json({
                message:"No Connection requests yet"
            });
        }

        res.json({
            message: "Data fetched successfully",
            data : connectionRequests,
        });

    }catch(err){
        res
        .status(400)
        .json("ERROR : "+ err.message);
    }
});

//GET api for getting all the connections of the user
user.get("/user/connections", userAuth, async(req, res)=>{
    try{
        const loggedInUser = req.user;

        const connections = await ConnectionRequest.find({
            $or: [
                {
                    fromId: loggedInUser._id,
                    status: "accepted",
                },
                {
                    toId: loggedInUser._id,
                    status: "accepted",
                }
            ]
        }).populate("fromId",USER_SAFE_DATA).populate("toId", USER_SAFE_DATA); 

        const data = connections.map((row)=>{
            if(row.fromId._id.toString() === loggedInUser._id.toString())
                return row.toId;
            return row.fromId;
        });

        res.json({
            message: "Connections fetched successfully",
            data,
        })
    }catch(err){
        res
        .status(400)
        .json({
            message: "ERROR : "+ err.message,
        })
    }
});

//GET api for feed 
user.get("/user/feed", userAuth, async(req, res)=>{
    try{
        const loggedInUser = req.user;
        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        limit = limit>50?50:limit;

        const skip = (page-1)*limit;

        const allMyConnectionRequests = await ConnectionRequest.find({
            $or:[
                {fromId: loggedInUser._id},
                {toId: loggedInUser._id},
            ],
        }).select("fromId toId");

        const hideUsersFromFeed = new Set();//later convert to array for db query
        allMyConnectionRequests.forEach(conReq => {
            hideUsersFromFeed.add(conReq.fromId.toString());
            hideUsersFromFeed.add(conReq.toId.toString());
        });
        
        //for now get all the users from db, for which there are no connecions (interactions ) with loggedInUser
        const otherUsers = await User.find({
            $and: [
                { _id: { $nin: Array.from(hideUsersFromFeed)}},
                { _id: { $ne : loggedInUser._id}},
            ],
        })
        .select(USER_SAFE_DATA)
        .skip(skip)
        .limit(limit); 

        //api should have pagination. Say 10 users at a time
        
        res.json({ 
            message: "Data fetched successfully",
            data: otherUsers,
        });

    }catch(err){
        res
        .status(400)
        .json({message: "Error : " + err.message});
    }
});
module.exports = user;