-create a repo - done 
-initialize the repo - npm init - done (package.json gets created with basic project description)
-node_modules, package.json, package-lock.json 
    node_modules - contains the libraries and code of the installed packages and the dependencies of the package
    the installed package is a dependency for the project 
    package lock.json - in package.json the dependency of the package is defined with the version, that version will be 
    starting with ^ or ~, which tells the code to use the latest possible version of the package
    that exact version will be present in the package-lock.json file

-install express - npm i express
-create server - require the express module and create a server instance
-listen to port 7777 - app.listen
-write requrest handlers for /test, /help
-install nodemon and add scripts - scripts allow us to run the app in different modes
-difference between caret and tilda - caret - 4.x.x , tilda - 4.19.x
-what is the use of "-g" while npm installs nodemon? - installing nodemon globally 


28th Nov
- initialize git - git init
- .gitignore
- create a remote repo on github
- push all the code to github (git add . && git commit -m "message")
- and git commands from githubs
- play with routes and route extensions and the effect of SEQUENCE of routes in the code
- install Postman and test our backend APIs with it
  - REST API services are being used to connect backend with frontend (HTTP method).
- Write logic to hande GET, POST, PATCH, DELETE API Calls and test them on Postman

- Multiple route handlers - play 
- next();
- next function and error along with res.send();
- app.use("/rounte", rh, [rh1, rh2], rh3, rh4);
- What is a Middleware, call back functions that the API request goes through before the execution (res.send()) at the actual route handler
- How express JS basically handles requests behind the scenes?
- Difference in app.use and app.all
- Write a dummy auth middleware for admin
- Write a dummy auth middleware for all user routes, except /user/login
- error handling with "/" wild card (not to be relyed on)
  app.use("/", (err, req, res, next) =>{})l

- Create a free cluster (of DBs) on MongoDB official website (Mongo Atlas)
- Install mongoose library
- connect your application to the Database "connection-url"/devTinder
- call the connectDB function adn connect to the DB before starting the application on 7777
- Create a user schema with mongoose and export the model
- Create POST /signup API to add data to database
- PUsh some documents using API calls from postman

- JS object vs JSON obj difference
- Add the express.json middleware to your application
- make the sign up api, dynamic
- create Feed api and get the users with a filter 
- and all the users without filter
- user.findOne with duplicate email ids, which object will be returned?
- write an API to delete the users from DB
- write an API to update the user using Patch
- Difference between put and patch
- Explore the Mongoose Documentation for Model methods
- What are options in a Model.findOneAndUpdate method, explore moer about it
- API - update the user with email ID - practice

Data Sanitation and Schema Validations
- restrict the user by adding validation to the data at the schema level
 - add required, unique lowercase, min , minlength, trim,
 - default
- create custom validat function for gender
- restrict the user to update only reqiuired fields, like, photo, about, gender, age, skills etc,.
- do not allow them to edit email(for now, later on, write an api to change mail id and verify that mail id through otp verification)
- Add API level validation on Patch request & Signup post api
- Add API validation for each field.
- Install and Valdiator lib functions

Encryption of passwords
- Never trust req.body
- validate
- encrypt the required data (passwords)
- then save it to the DB.
- industry standards - create helper functions in a new utils folder for these
- create login API
- compare passwords and throw errors if emai or password is invalid

Authentication processes (advanced)
- install cookie-parser
- send a dummy cookie in the login API to the client
- create a get api to get the profile and validate the dummy cookie
- install jsonwebtoken
- in login API, after email and password validation, create a JWT and send it to the client
- in get/profile API, verify the token using jwt.verify.. read documentation
- read the cookeis inside your profile API and find the logged in user
- Add the userAuth middleware in profile API and a new sendConnectionRequest API
- Set the expiry of JWT token and cookies to 7 days.
- Create UserSchema method to getJWT()
- Create UserSchema method to validatePassword(passwordInputByUser);


Implement routing
- explore tinder APIs
- create a list of all API u can think of, in Devtinder
- Group multiple routes under respective routers
- Read documentation for express.Router
- Create routes folder for managing auth, profile, request routers
- import & test the routers in app.js
- create POST /logout api
- create PATCH /profile/edit api
- create PATCH /profile/password api => forgot password API
- Validate all the data in every POST, PATCH APIs

- Create Connection request schema - done
- Send Connection Request APIs - done
- Proper Validation of Data - done
- Think abot all conrner cass - 4 done
- $or query $and query in mongoose - read - done
- schema.pre("save") function - done - it is kind of like a pre hook, before execution of any db function 
  the method/mw that is specified by this pre hook is executed first
- What is the advantages and disadvantages of creating and index - read
- Read --> compound indexes from mongodb docs - read
- ALWAYS THINK ABOUT CORNER CASES 

- Write code with proper validations for POST API for accept/reject requests
- Thought process for POST Vs GET apis 
- Read about ref and populate 
- create GET /user/requests/received - done
- create GET /user/connections - used OR query

- logic for GET /user/feed API
- Explore the $nin, $ne other db query operators
- pagination

Notes:
    /feed?page=1&limit=10 => 1-10 => .skip(0) & .limit(10);
    skip = (pageNo - 1)*limit