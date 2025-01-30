const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema({
        fromId:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        toId:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        status:{
            type: String,
            required: true,
            enum: {
                values:["interested","accepted","ignored","rejected"],
                message:`{VALUE} Invalid status`,
            },
        }
    },
    {timestamps: true},
);

 //connecionRequest.find({fromUserId: sds225232543, toUserId: sdfks43434453});
//to optimize the above query the compound indexing is done
connectionRequestSchema.index({fromId: 1, toId:1});

connectionRequestSchema.pre("save", function(next){
        
        if(this.fromId.equals(this.toId)){
            throw new Error("Cannot send connection request to yourself!");
        }
        next();
})

module.exports = mongoose.model("ConnectionRequest", connectionRequestSchema);