const express = require("express");
const profileRouter = express.Router();
const {userAuth} = require("../middlewares/auth");
const {validateEditProfileData, validateEditPassword} = require("../utils/validation");
const bcrypt = require("bcrypt");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
    try {
        const user = req.user;
        res.send(user);
    } catch (err) {
        res.status(400).send("ERROR: " + err);
    }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
    try {
        const isEditAllowed = validateEditProfileData(req);
        if(!isEditAllowed){
            throw new Error("Edit invalid");
        }
        const loggedInUser = req.user;

        Object.keys(req.body).forEach(key => (loggedInUser[key] = req.body[key]));

        await loggedInUser.save();
        res.send("Your profile is updated.");
    } catch (err) {
        res.status(500).send("ERROR : " + err.message);
    }
});

profileRouter.patch("/profile/password", userAuth, async(req, res)=>{
    try{
        
        await validateEditPassword(req);
        const newPassword = req.body.newPassword;
        console.log(newPassword);
        
        const user = req.user;
        user.password = await bcrypt.hash(newPassword,10);
        user.save();
        res.send("Password updated successfully");
    }catch(err){
        res.status(400).send("ERROR : " + err.message);
    }
})

module.exports = profileRouter;