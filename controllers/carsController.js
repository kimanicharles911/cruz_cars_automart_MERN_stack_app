import { CarModel } from '../models/CarModel.js';
import mongoose from 'mongoose';
import multer from 'multer';
import fileSystem from 'fs';
import path from 'path';

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
    const dataVar = fileSystem.readFileSync(path.join('./uploadedImages/' + req.file.filename));
    const mimeType = `image/${path.extname(path.join('./uploadedImages/' + req.file.filename)).split('.').pop()}`;
    
    const carVar = new CarModel({ modelSpec, makeSpec, sellingPrice, mileage, registrationNumber, owner, address, photo: { Data: dataVar, ContentType: mimeType } });
    fileSystem.unlinkSync('./uploadedImages/' + req.file.filename);
    const result = await carVar.save();
    return res.status(201).send(result);
  }catch(err){
    return res.status(400).send(`Problem creating car record. ${err.message}`);
  }
};

const getCarsFunc = async(req, res) => {
  try{
    if(req.query.id){
      const { id } = req.query;
      const result = await CarModel.findById(id);
      return res.status(200).send(result);
    }
    const result = await CarModel.find();
    return res.status(200).send(result);
  }catch(err){
    return res.status(400).send(`Problem getting car(s) record(s). ${err.message}`);
  }
};

const updateCarFunc = async(req, res) => {
  try{
    const { id } = req.params;
    const { modelSpec, makeSpec, sellingPrice, mileage, registrationNumber, owner, address } = req.body;
    // const photo = req.file.filename;
    const dataVar = fileSystem.readFileSync(path.join('./uploadedImages/' + req.file.filename));
    const mimeType = `image/${path.extname(path.join('./uploadedImages/' + req.file.filename)).split('.').pop()}`;
    if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(404).send(`No post with id: ${id}`);
    }
    const updatedCarVar = { _id: id, modelSpec, makeSpec, sellingPrice, mileage, registrationNumber, owner, address, photo: { Data: dataVar, ContentType: mimeType } };
    fileSystem.unlinkSync('./uploadedImages/' + req.file.filename);
    const result = await CarModel.findByIdAndUpdate(id, updatedCarVar, {new: true});
    return res.send(result);
  }catch(err){
    return res.send(`Problem updating the car record. ${err.message}`);
  }
};

const deleteOneCarFunc = async(req, res) => {
  try{
    const { id } = req.params;
    const result = await CarModel.deleteOne({ _id: id });
    return res.send(result);
  }catch(err){
    return res.status(400).send(`Problem deleting the car record. ${err.message}`);
  }
};

export { uploadFunc, createCarFunc, getCarsFunc, updateCarFunc, deleteOneCarFunc }