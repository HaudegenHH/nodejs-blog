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
(you can manage them later on via the "network access page" which will be needed if you upload the project to a server, which ip address would be listed here, but for development purposes you can choose 0.0.0.0 (access from anywhere) or simply press the "add my current ip address" button)
