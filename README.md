## Blog with NodeJS, Express and MongoDB

- mkdir nodejs_blog and cd into folder

- initialize as npm projekt:
```sh
npm init -y
```

- install a couple of (dev-) dependencies

```sh
npm i bcrypt connect-mongo cookie-parser dotenv ejs express express-ejs-layouts express-session jsonwebtoken method-override mongoose
```

```sh
npm i nodemon --save-dev
```

-  create .gitignore
-  create .env
-  for now put node_modules/ and .env into .gitignore

-  in package.json  create under scripts a starting script for nodemon:

"start": "app.js"

and

"dev": "nodemon app.js"

app.js will be the file that starts the express server

with "nodemon app.js" you dont have to restart the server manually each time you change sth

-  create app.js

-  in order to make app.js less messy you want to have the routes in a separated file thus create
a folder: "server" and inside (since you have 2 different routes, one for homepage, about, etc and the other for the admin panel) you create another folder "routes" with main routes for now

- register that routes files in app.js

---

### MongoDB Connection

- google "MongoDB Atlas"
- sign in conveniently with your google account
- create a new project
- create a database for that project, thus choose the free tier and a server near to your location.
- rename it from "cluster0" to "nodeblog" 
- choose a username&password (save it in .env)
 - finally you can add ip addresses that are allowed to connect to the projects clusters
(you can manage them later on via the "network access page" which will be needed if you upload the project to a server, which ip address would be listed here, but for development purposes you can choose 0.0.0.0 (access from anywhere) or simply press the "add my current ip address" button) -> hit finish
- click "connect" and choose "Connecting with MongoDB for VS Code" (if you like you could utilize the vscode extension with that name, but its not neccessary)
- copy the connection string and save it in .env (and use the pw you defined earlier)

---

## interaction with mongodb

- to add sth to the database, you can do this via a route that you define for that purpose, or simply take the home route for that and the first thing would be to import the Post Model/Schema in routes/main.js to interact with the database via the Model
- due to the small size of the project, I have refrained from creating controllers
- after importing the model, you can use it to perform the common crud operations like read and insert data, update and delete
- then for inserting dummy-data once you can write a function like "insertPostDummyData" where you perform this create-operation by using the Post-Model
- Post.insertMany([{}]) takes an array of objects and since createdAt and updatedAt are created automatically, you just have to provide an array of objects (or rather: js object literals) with title and body and the id for each record will be created by mongodb as well.

- ! if you want to create a collection called "blog" right away when inserting the test data once, you only need to add a /blog to the MongoDB connection string. (otherwise its name would be "test")

- to retrieve the data afterwards on the home route, you simply have to make the callback async and inside a try-catch you could use the simplest method for retrieving the data: find()



