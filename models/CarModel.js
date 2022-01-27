// Car Model
import mongoose from 'mongoose';

const carSchema = new mongoose.Schema({
  cruzCarsId: {
    type: String,
    required: true,
    unique: true
  },
  modelSpec: {
    type: Number,
    required: true
  },
  makeSpec: {
    type: String,
    required: true
  },
  sellingPrice: {
    type: Number,
    required: true
  },
  mileage: {
    type: Number,
    required: true
  },
  photo: {
    type: String,
    required: true
  },
  registrationNumber: {
    type: String,
    required: true,
    unique: true
  },
  owner: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  }
}, {
      timestamps: true
});

// cars is the name of the MongoDB collection
const CarModel = mongoose.model('cars', carSchema);
export {CarModel};