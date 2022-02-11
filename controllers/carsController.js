// Comments are found in the last part of this file.
import { CarModel } from "../models/CarModel.js";
import mongoose from "mongoose";
import multer from "multer";
import fileSystem from "fs";
import path from "path";

// define car photos storage
const storageObj = multer.diskStorage({
  destination: function (request, file, callback) {
    callback(null, "./uploadedImages");
  },
  // add back file extension
  filename: function (request, file, callback) {
    callback(null, Date.now() + file.originalname);
  },
});

// multer upload params
const uploadFunc = multer({
  storage: storageObj,
  limits: {
    fieldSize: 1024 * 1024 * 3,
  },
}).single("photo");

// Comments are found in the last part of this file.
const createCarFunc = async (req, res) => {
  try {
    const {
      modelSpec,
      makeSpec,
      sellingPrice,
      mileage,
      registrationNumber,
      owner,
      address,
    } = req.body;
    const dataVar = fileSystem.readFileSync(
      path.join("./uploadedImages/" + req.file.filename)
    );
    const mimeType = `image/${path
      .extname(path.join("./uploadedImages/" + req.file.filename))
      .split(".")
      .pop()}`;

    const carVar = new CarModel({
      modelSpec,
      makeSpec,
      sellingPrice,
      mileage,
      registrationNumber,
      owner,
      address,
      photo: { Data: dataVar, ContentType: mimeType },
    });
    fileSystem.unlinkSync("./uploadedImages/" + req.file.filename);
    const result = await carVar.save();
    return res.status(201).send(result);
  } catch (err) {
    return res.status(400).send(`Problem creating car record. ${err.message}`);
  }
};

const getCarsFunc = async (req, res) => {
  try {
    if (req.query.id) {
      const { id } = req.query;
      const result = await CarModel.findById(id);
      return res.status(200).send(result);
    }
    const result = await CarModel.find();
    return res.status(200).send(result);
  } catch (err) {
    return res
      .status(400)
      .send(`Problem getting car(s) record(s). ${err.message}`);
  }
};

const searchCarsFunc = async (req, res) => {
  try {
    if (req.query.carAge) {
      const { carAge } = req.query;
      const currentYear = new Date().getFullYear();
      const floorYear = currentYear - carAge;
      const result = await CarModel.where("modelSpec").gt(floorYear - 1);
      return res.status(200).send(result);
    }
  } catch (err) {
    return res
      .status(400)
      .send(`Problem getting car(s) with that age. ${err.message}`);
  }
};

const updateCarFunc = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      modelSpec,
      makeSpec,
      sellingPrice,
      mileage,
      registrationNumber,
      owner,
      address,
    } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send(`No post with id: ${id}`);
    }

    let dataVar, mimeType, updatedCarVar;
    if (req.file) {
      dataVar = fileSystem.readFileSync(
        path.join("./uploadedImages/" + req.file.filename)
      );
      mimeType = `image/${path
        .extname(path.join("./uploadedImages/" + req.file.filename))
        .split(".")
        .pop()}`;

      updatedCarVar = {
        _id: id,
        modelSpec,
        makeSpec,
        sellingPrice,
        mileage,
        registrationNumber,
        owner,
        address,
        photo: { Data: dataVar, ContentType: mimeType },
      };

      fileSystem.unlinkSync("./uploadedImages/" + req.file.filename);
    } else {
      updatedCarVar = {
        _id: id,
        modelSpec,
        makeSpec,
        sellingPrice,
        mileage,
        registrationNumber,
        owner,
        address,
      };
    }

    const result = await CarModel.findByIdAndUpdate(id, updatedCarVar, {
      new: true,
    });
    return res.status(200).send(result);
  } catch (err) {
    return res
      .status(400)
      .send(`Problem updating the car record. ${err.message}`);
  }
};

const deleteOneCarFunc = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await CarModel.deleteOne({ _id: id });
    return res.status(200).send(result);
  } catch (err) {
    return res
      .status(400)
      .send(`Problem deleting the car record. ${err.message}`);
  }
};

export {
  uploadFunc,
  createCarFunc,
  getCarsFunc,
  searchCarsFunc,
  updateCarFunc,
  deleteOneCarFunc,
};

/* 
  * I first imported the CarModel, mongoose, multer, fileSystem and path libraries. 
  * I then used the multer diskStorage function to store images in the uploadedImages folder.
  * I then wrote the multer upload function setting the diskStorage and limits property. I then called the single function and passed the name of the file as will be received in the form data. Single means only one image will be in the form data.

  * I then wrote the createCarFunc that manages all post requests. I store all data in the body of the request by destructuring it into respective variables. I then store the image uploaded in dataVar and it's mimeType in the mimeType variable.
  * I then create a new instance of the CarModel passing the required fields by the schema.
  * I then delete the image in the uploadedImages folder after it has been converted to buffer format and stored as on of the property values in the CarModel instance.
  * I then save the model instance to the mongoDB by calling save() on carVar.
  * I then return the save response and http status.
  * Any error from the try block is returned in the catch block.

  * I then created the getCarsFunc that manages the GET requests in the route /api/v1/cars/car . I then deal with managing requests that have a car ID.
  * After destructuring the ID from the request query I pass the ID as parameter of the mongoose findById method when calling the CarModel. I then return the response and http status. 
  * If the request lacks a car ID I apply the find mongoose method on the CarModel. I then return the response and http status. Any error from the try block is returned in the catch block.

  * I then created the searchCarsFunc that manages the GET requests in the route /api/v1/cars/search . If the request has the carAge query, I destructure the carAge.
  * I then get the floor limit year of cars the response should return with by subtracting the current year from the carAge.
  * I then apply the where and greater than mongoose methods on the CarModel to get cars that were manufactured on the floor year and afterwards.
  * I then return the response and http status. Any error from the try block is returned in the catch block.

  * I then create the updateCarFunc that manages PATCH requests.  I then destructure the ID from the request parameters. I then destructure all data in the request body into it's respective variables. 
  * I then validate whether the ID is a valid mongoose ID. 
  * I then create variables that will be used both inside and outside the if...else block.
  * If the request has a car photo I store the image uploaded in dataVar and it's mimeType in the mimeType variable.
  * I then store all data regarding the car update in an object so that It will be passed to the carModel later.
  * I then delete the image in the uploadedImages folder after it has been stored in the photo property of the updatedCarVar.
  * If the request has no photo store all data regarding the car update in an object so that It will be passed to the carModel later less the photo property.
  * I then apply the findByIdAndUpdate mongoose method on the CarModel passing the car ID, updatedCarVar and new option.
  * I then return the response and http status. Any error from the try block is returned in the catch block.

  * I then created the deleteOneCarFunc that manages the DELETE requests. I destructure the car ID from the request parameter. 
  * I then apply the deleteOne method on the CarModel passing the id object as the condition.
  * I then return the response and http status. Any error from the try block is returned in the catch block.

  * I then export functions that will be required by the router module http methods.
*/

/* 
  REFERENCES
  ==========>
  1. Upload and Retrieve Image on MongoDB using Mongoose
https://www.geeksforgeeks.org/upload-and-retrieve-image-on-mongodb-using-mongoose/
  2. Node.js get file extension
  https://stackoverflow.com/a/67934955/9497346
  3. How to upload/store images in MongoDB using Node.js, Express & Multer
  https://www.bezkoder.com/node-js-upload-store-images-mongodb/
  4. https://khanasadkhan48.medium.com/. how-to-upload-a-image-to-react-express-and-how-to-store-it-in-mongodb-using-buffer-type-e82d5751da79
  5. https://www.youtube.com/watch?v=KoWTJ5XiYm4
  6. https://www.youtube.com/watch?v=SqbrovwhZ_o
  7. https://www.youtube.com/watch?v=b6Oe2puTdMQ
  8. https://attacomsian.com/blog/uploading-files-nodejs-express
*/