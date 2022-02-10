// Comments are found in the last part of this file.
import express from 'express';
const app = express();
import cors from 'cors';
app.use(cors());
app.use(express.json());
import { EXPRESS_APP_PORT, MONGO_DB_USERNAME, MONGO_DB_DATABASE } from './config/index.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const mongoDbPassword = process.env.MONGODB_PASSWORD;

import {routes} from './routes/index.js';

// connect to online mongoDB
mongoose.connect(`mongodb+srv://${MONGO_DB_USERNAME}:${mongoDbPassword}@emmethubclusterone.disfr.mongodb.net/${MONGO_DB_DATABASE}?retryWrites=true&w=majority`, () => {
  console.log(`😜 Connected to ${MONGO_DB_DATABASE} database.`);
}, (e) => console.error(`${e} Error connecting to ${MONGO_DB_DATABASE} database!`));

app.use('/api/v1/cars', routes);

/* 
  * I created a function that enables serving of static files from the frontend.
  * I begun with a condition that ensures that the operating environment is production.
  * I then set the static folder location.
  * I then set the route to all other possible routes so as to load the frontend root file which in react is a index.html file.
*/
if(process.env.NODE_ENV === 'production'){
  app.use(express.static('frontend/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    // res.status(404).send('Sorry! Can’t find that resource. Please check your URL.');
  });
}

// From the app object with the express function I used the listen method and set the port.
app.listen(EXPRESS_APP_PORT, () => {
  console.log(`😜 App Server is listening at http://localhost:${EXPRESS_APP_PORT}`);
});

/*
 * I first imported the express, mongoose and dotenv libraries and cors middleware.
 * I then imported the EXPRESS_APP_PORT, MONGO_DB_USERNAME and MONGO_DB_DATABASE constant variables from the config folder.
 * I then imported the routes module.
 * I then imported the mongoDB password and stored it in a variable.
 * I then stored the called express function in a variable app.
 * I executed the .json() middleware function on the express app function to enable sending of data in JSON format.
 * I then executed the config function of the dotenv library.
 * I then executed the cors function on the express app function to enable sharing of resources.
 * I then connect to my MongoDB database using mongoose.
 * I then defined the route of the cars API an passed the routes module.
 * I created a function that enables serving of static files from the frontend.
 * I begun with a condition that ensures that the operating environment is production.
 * I then set the static folder location.
 * I then set the route to all other possible routes so as to load the frontend root file which in react is a index.html file.
 * From the app object with the express function I used the listen method and set the port.
 */
