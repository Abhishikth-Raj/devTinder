const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
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
    // add username at the end of the project
    // username:{
    //     type:String,
    //     minLength: 8,
    //     maxLength: 50,
    //     trim: true,
        
    // },
    emailId:{
        type:String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("email address not found or invalid");
            }
        },
    },
    password:{
        type:String,
        required: true,
        minLength: 8,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Password is too weak");
            }
        }
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
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("invalid image type");
            }
        }
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
});


userSchema.methods.getJWT = async function(){
    const user = this;
    const token = await jwt.sign({_id: user._id}, "Dev@tinder#123",{
        expiresIn:"7d",
    });
    console.log(token);
    
    return token;
};

userSchema.methods.validatePassword = async function(passwordInputByUser){
    const user = this;
    const passwordHash = user.password;
    const isPasswordValid = await bcrypt.compare(
        passwordInputByUser,
        passwordHash,
    );
    return isPasswordValid;
}
module.exports = mongoose.model("User", userSchema);