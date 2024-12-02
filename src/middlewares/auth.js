 function adminAuth(req, res, next){
    console.log("Admin being authenticated");
    const token = "xyz";//token from request
    let isAuthenticated = token === "xyz";

    if(isAuthenticated){
        next();
    }else{
        console.log("-------------Bad Admin Request");
        res.status(401).send("Err:401, Admin not authenticated");
    }
}

function userAuth(req, res, next){
    console.log("user being authenticated");
    const token = "xyz";//token from request
    let isAuthenticated = token === "xyz";

    if(isAuthenticated){
        next();
    }else{
        console.log("-------------Bad User Request");
        res.status(401).send("Err:401, user not authenticated");
    }
}

module.exports = {
    adminAuth,
    userAuth
}