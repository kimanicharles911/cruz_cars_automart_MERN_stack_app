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
  })
}

// From the app object with the express function I used the listen method and set the port.
app.listen(EXPRESS_APP_PORT, () => {
  console.log(`😜 App Server is listening at http://localhost:${EXPRESS_APP_PORT}`);
});