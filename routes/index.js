import express from 'express';
const router = express.Router();
import { upload, createCarFunc } from '../controllers/carsController.js';

// Example URL: http://localhost:8081/api/v1/cars/
router.get('/', (req, res) => {
  res.send('Hello user! You are in something called the backend in software development!')
});

/* 
  * Example URL: http://localhost:8081/api/v1/cars/car
  * Example JSON to be sent in the request body:
    {
      "modelSpec": 2012,
      "makeSpec": "GMC Sierra 1500 SLT",
      "sellingPrice": 29998,
      "mileage": 59000,
      "photo": ,
      "registrationNumber": "KDD 750C",
      "owner": "Hillary Clement",
      "address": "100, Baraka Rd, Dar-es-salaam"
    }
*/

router.post('/car', upload, createCarFunc);

export {router as routes};