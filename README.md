
# Full Stack JavaScript Techdegree v2 - REST API Project (Project #9)
## Description
In this project, I started from a minimal provided HTTP API and built it out.
This API provides these endpoints:
### Users
**Get a list of all courses**
```
$ curl http://localhost:5000/api/courses
```

**Get an individual course**
```
$ curl http://localhost:5000/api/courses/[course id]
```

**Create new course**

*must be authenticated to create a course*

```
$ curl --user [your email]:[your password] -d '{"title":"[your title]", "description":"[your description]"}' -H "Content-Type: application/json" -X POST http://localhost:5000/api/courses/[course id]
```
Available options:
- title (required)
- description (required)
- estimatedTime
- materialsNeeded

**Update a course**

*must be authenticated as the course's owner to update it*
```
$ curl --user [your email]:[your password] -d '{"title":"[your updated title]"}' -H "Content-Type: application/json" -X PUT http://localhost:5000/api/courses/[course id]
```
Available options:
- userId
- title (required)
- description (required)
- estimatedTime
- materialsNeeded

**Delete a course**

*must be authenticated as the course's owner to delete it*
```
$ curl --user [your email]:[your password] -X DELETE http://localhost:5000/api/courses/[course id]
```


### Users
**Get currently authenticated user**
```
$ curl --user [your email]:[your password] http://localhost:5000/api/users
```

**Add a new user**
```
$ curl  -d '{"firstName":"[your first name]", "lastName":"[your last name]", "emailAddress":"[your email address]", "password":"[your password]"}' -H "Content-Type: application/json" -X POST http://localhost:5000/api/users
```
Fields: (all fields are required)
- firstName
- lastName
- emailAddress
- password

We've supplied the following files for you to use: 

* The `seed` folder contains a starting set of data for your database in the form of a JSON file (`data.json`) and a collection of files (`context.js`, `database.js`, and `index.js`) that can be used to create your app's database and populate it with data (we'll explain how to do that below).
* We've included a `.gitignore` file to ensure that the `node_modules` folder doesn't get pushed to your GitHub repo.
* The `app.js` file configures Express to serve a simple REST API. We've also configured the `morgan` npm package to log HTTP requests/responses to the console. You'll update this file with the routes for the API. You'll update this file with the routes for the API.
* The `nodemon.js` file configures the nodemon Node.js module, which we are using to run your REST API.
* The `package.json` file (and the associated `package-lock.json` file) contain the project's npm configuration, which includes the project's dependencies.
* The `RESTAPI.postman_collection.json` file is a collection of Postman requests that you can use to test and explore your REST API.

## Getting Started

To get up and running with this project, run the following commands from the root of the folder that contains this README file.

First, install the project's dependencies using `npm`.

```
npm install

```

Second, seed the SQLite database.

```
npm run seed
```

And lastly, start the application.

```
npm start
```

To test the Express server, browse to the URL [http://localhost:5000/](http://localhost:5000/).
