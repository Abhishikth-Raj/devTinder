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

module.exports = {
    validateSignUpData,
};
