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