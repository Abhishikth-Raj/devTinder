const express = require("express");
const requestRouter = express.Router();
const {userAuth} = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

requestRouter.post("/request/send/:status/:toId", userAuth, async (req, res)=>{
    try{
        //from is the current user
        const fromId = req.user._id;
        const toId = req.params.toId;
        const status = req.params.status;
        //validating status
        const allowedStatus = ["interested", "ignored"];
        if(!allowedStatus.includes(status)){
            return res
            .status(400)
            .json({
                message: "Invalid status"
            });
        }
        const toUser = await User.findOne({_id:toId});
        //console.log(toUser);
        if(!toUser){
            return res
            .status(400)
            .json({
                message: "request cannot be sent, user does not exist"
            });
        }
        const existingConnectionRequest = await ConnectionRequest.findOne({
            $or:[
                {fromId,toId},
                {fromId: toId, toId: fromId}
            ]
        });

        //handle duplicate requests & deadlock
        if(existingConnectionRequest){
            throw new Error("Connection request already exists");
        }

        const connectionRequest = new ConnectionRequest({
            fromId,
            toId, 
            status,
        });
        const data = await connectionRequest.save();
        res.json({
            message: req.user.firstName +" " + status +" " + toUser.firstName,
            data
        });
    }catch(err){
        res.status(400).send("ERROR : " + err.message);
    }
});

requestRouter.post("/request/review/:status/:requestId", userAuth, async(req, res)=>{
    try{
        const loggedInUser = req.user;
        const {status, requestId} = req.params; 
        
        //validate status
        const allowedStatus = ["accepted", "rejected"];
        if(!allowedStatus.includes(status)){
            throw new Error("Invalid status");
        }
        //validate request id, current status should be interested, to-userid of the connection request should
        //be the logged in user id
        const existingConnectionRequest = await ConnectionRequest.findOne({
            _id: requestId,
            toId: loggedInUser._id,
            status:"interested",
        });
        if(!existingConnectionRequest){
            return res.status(404).json({
                message: "ERROR : request does not exist",
            })
        }

        existingConnectionRequest.status = status;
        const data = await existingConnectionRequest.save();

        res.json({
            message: "Connection request " + status + " by " +loggedInUser.firstName,
            data,
        })
    }catch(err){
        res.status(400).json({
            message : "ERROR : " + err.message,
        });
    }
});

module.exports = requestRouter;