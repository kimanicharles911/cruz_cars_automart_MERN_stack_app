import express from 'express';
const router = express.Router();
import { uploadFunc, createCarFunc, getCarsFunc, searchCarsFunc, updateCarFunc, deleteOneCarFunc } from '../controllers/carsController.js';

router.get('/', (req, res) => {
  res.status(200).send('Hello user! Our API root is found here. ( /api/v1/cars ).')
});

router.post('/car', uploadFunc, createCarFunc);
router.get('/car', getCarsFunc);
router.get('/search', searchCarsFunc);
router.patch('/car/:id', uploadFunc, updateCarFunc);
router.delete('/car/:id', deleteOneCarFunc);

export {router as routes};

/* 
  * I first imported the express library and then created a router module.
  * I then imported carController functions that will be required by the router module http methods.
  * I then defined a GET route in the root of the endpoint.
      * Example URL: http://localhost:8081/api/v1/cars/
  * I then defined a /car POST route and mounted the uploadFunc and createCarFunc from the carController.
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
  * I then defined a /car GET route and mounted the getCarsFunc from the carController.
      * Example to get all cars GET URL: http://localhost:8081/api/v1/cars/car
      * Example to get one car GET URL: http://localhost:8082/api/v1/cars/car?id=61f3bf1ec27ace1490f0b84b
  * I then defined a /search GET route and mounted the searchCarsFunc from the carController.
      * Example to search for cars GET URL: http://localhost:8080/api/v1/cars/search?carAge=9
  * I then defined a /car/:id PATCH route and mounted the uploadFunc and updateCarFunc from the carController.
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
  * I then defined a /car/:id DELETE route and mounted the deleteOneCarFunc from the carController.
        * Example DELETE URL: http://localhost:8081/api/v1/cars/car/61f37614e24f30ca0558cc41

  * I then exported the router module as routes.
*/
