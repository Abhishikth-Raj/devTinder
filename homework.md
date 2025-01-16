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
- What is a Middleware
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

