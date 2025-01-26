 const validator = require("validator");

const validateSignUpData = (req) => {
    const {firstName, lastName, emailId, password} = req.body;

    if(firstName.length < 1 || firstName.length>50){
        throw new Error("ERROR : first name should have 1-50 characters");
    }
    if(!validator.isEmail(emailId)){
        throw new Error("ERROR : email is not valid");
    }
    if(!validator.isStrongPassword(password)){
        throw new Error("ERROR : Password is weak");
    }
}
const validateEditProfileData = async(req)=>{
    const allowedEditFields = [
            "firstName", "lastName", "emailId", "age", "gender", "skills", "about"
        ];

    const isEditAllowed = Object.keys(req.body).forEach((field) =>allowedEditFields.includes(field));

    return isEditAllowed;
};

const validateEditPassword = async(req)=>{
    const {oldPassword , newPassword} = req.body;
        const user = req.user;
        
        const isPasswordValid = await user.validatePassword(oldPassword);

        if(!isPasswordValid){
            throw new Error("Incorrect current password");
        }
        if(!validator.isStrongPassword(newPassword)){
            throw new Error("your new password is weak");
        }
}
module.exports = {
    validateSignUpData,
    validateEditProfileData,
    validateEditPassword,
};
