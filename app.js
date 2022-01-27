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

// From the app object with the express function I used the listen method and set the port.
app.listen(EXPRESS_APP_PORT, () => {
  console.log(`😜 App Server is listening at http://localhost:${EXPRESS_APP_PORT}`);
});