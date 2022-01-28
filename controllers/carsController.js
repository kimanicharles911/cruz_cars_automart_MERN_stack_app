import { CarModel } from '../models/CarModel.js';
import mongoose from 'mongoose';
import multer from 'multer';

// define car photos storage
const storageObj = multer.diskStorage({
  destination: function(request, file, callback){
    callback(null, './uploadedImages');
  },
  // add back file extension
  filename: function(request, file, callback){
    callback(null, Date.now() + file.originalname)
  }
});

// multer upload params
const uploadFunc = multer({
  storage: storageObj,
  limits: {
    fieldSize: 1024 * 1024 * 3
  }
}).single('photo');

const createCarFunc = async(req, res) => {
  try{
    const { modelSpec, makeSpec, sellingPrice, mileage, registrationNumber, owner, address } = req.body;
    const photo = req.file.filename;
    const carVar = new CarModel({ modelSpec, makeSpec, sellingPrice, mileage, registrationNumber, owner, address, photo });
    const result = await carVar.save();
    res.status(201).send(result);
  }catch(err){
    return res.status(409).send(err.message);
  }
}

const updateCarFunc = async(req, res) => {
  try{
    const { id } = req.params;
    const { modelSpec, makeSpec, sellingPrice, mileage, registrationNumber, owner, address } = req.body;
    const photo = req.file.filename;
    if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(404).send(`No post with id: ${id}`);
    }
    const updatedCarVar = { _id: id, modelSpec, makeSpec, sellingPrice, mileage, registrationNumber, owner, address, photo };
    const result = await CarModel.findByIdAndUpdate(id, updatedCarVar, {new: true});
    res.send(result);
  }catch(err){
    return res.send(err.message);
  }
};

export { uploadFunc, createCarFunc, updateCarFunc }