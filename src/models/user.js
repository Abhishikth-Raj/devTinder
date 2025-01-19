const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
        minLength: 4,
        maxLength: 50,
        trim: true,
    },
    lastName:{
        type:String,
        minLength: 1,
        maxLength: 50,
        trim: true,
    },
    username:{
        type:String,
        minLength: 4,
        maxLength: 50,
        trim: true,
    },
    emailId:{
        type:String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true,
    },
    password:{
        type:String,
        required: true,
        minLength: 8,
        maxLength: 50,
    },
    age:{
        type:Number,
        trim: true,
        min: 18,
        max: 60
    },
    gender:{
        type:String,
        validate(value){
            if(!["male", "female", "others"].includes(value)){
                throw new Error("Gender data is not valid");
            }
        },
    },
    photoUrl: {
        type: String, 
        default: "https://geographyandyou.com/images/user-profile.png",
    },
    skills: {
        type: [String],
        
    },
    about:{
        type: String,
        default: "Hey there! I'm using devTinder"
    }
},
{
    timestamps: true,
}
);

module.exports = mongoose.model("User", userSchema);