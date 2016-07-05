# Massdrop jobs queue

This app requires

 * [Node.js](https://nodejs.org/en/) (4.x) 
 * [MongoDB](https://www.mongodb.com/download-center?jmp=nav#community) 
 
to execute; once installed, run 

````
npm run start-mongo
``` 

to initialize the mongo instance in the mongo folder. (will run mongo in a local data folder - 
doesn't futz with any existing data /collections) 

Once mongo is running type

````
npm run start
````

to initiate the server at http://localhost:3001. (see bin/www for port setting)

you can run http://localhost:3001/api/seed to seed your DB with some starting records.

## Structure

The worker starts upon bootup of the express binary (`/bin/www`) that loads `work.js`. That file
runs periodically and uses methods of the Mongoose model `models/jobs.js` to attempt to load
a url and 

## Resources

The base app is created off an Express.js project generated by WebStorm.

The query page is generated from a mimial react seed project, https://github.com/pheuter/essential-react. 
