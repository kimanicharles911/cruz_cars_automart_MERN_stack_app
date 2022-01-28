import express from 'express';
const router = express.Router();
import { uploadFunc, createCarFunc, getAllCarsFunc, getOneCarFunc, updateCarFunc } from '../controllers/carsController.js';

// Example URL: http://localhost:8081/api/v1/cars/
router.get('/', (req, res) => {
  res.send('Hello user! Our API root is found at /api/v1/cars .')
});

router.post('/car', uploadFunc, createCarFunc);
router.get('/car', getAllCarsFunc);
router.get('/car/:id', getOneCarFunc);
router.patch('/car/:id', uploadFunc, updateCarFunc);

export {router as routes};

/* 
  * Example POST URL: http://localhost:8081/api/v1/cars/car
  * Example JSON to be sent in the request body:
    {
      "modelSpec": 2012,
      "makeSpec": "GMC Sierra 1500 SLT",
      "sellingPrice": 29998,
      "mileage": 59000,
      "photo": USE FORM instead of JSON,
      "registrationNumber": "KDD 750C",
      "owner": "Hillary Clement",
      "address": "100, Baraka Rd, Dar-es-salaam"
    }

  * Example to get all cars GET URL: http://localhost:8081/api/v1/cars/car
  * Example to get one car GET URL: http://localhost:8081/api/v1/cars/car/61f37614e24f30ca0558cc41

  * Example PATCH URL: http://localhost:8081/api/v1/cars/car/61f37614e24f30ca0558cc41
  * Example JSON to be sent in the request body:
    {
      "modelSpec": 2012
      "makeSpec": "Toyota 4Runner SR5"
      "sellingPrice": 41998
      "mileage": 18000
      "photo": USE FORM instead of JSON,
      "registrationNumber": "KCN 899C",
      "owner":"Craig Lukeshaw",
      "address":"2780, Stillwell Avenue Rd, Michigan"
    }

*/
