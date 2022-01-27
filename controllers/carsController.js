import { CarModel } from '../models/CarModel.js';
import mongoose from 'mongoose';
import multer from 'multer';

// define car photos storage
const storageObj = multer.diskStorage({
  destination: function(request, file, callback){
    callback(null, './uploadImages');
  },
  // add back file extension
  filename: function(request, file, callback){
    callback(null, Date.now() + file.originalname)
  }
});

// multer upload params
const upload = multer({
  storage: storageObj,
  limits: {
    fieldSize: 1024 * 1024 * 3
  }
}).single('photo');

const createCarFunc = async(req, res) => {
  const cruzCarsId = new mongoose.Types.ObjectId();
  const { modelSpec, makeSpec, sellingPrice, mileage, registrationNumber, owner, address } = req.body;
  const photo = req.file.filename;
  const carVar = new CarModel({ cruzCarsId, modelSpec, makeSpec, sellingPrice, mileage, registrationNumber, owner, address, photo });
  const result = await carVar.save();
  res.send(result);
}

export { upload, createCarFunc }