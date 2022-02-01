// Car Model
import mongoose from 'mongoose';

const carSchema = new mongoose.Schema({
  modelSpec: {
    type: Number,
    min: 1700,
    max: 2122,
    required: true
  },
  makeSpec: {
    type: String,
    minLength: 3,
    maxLength: 100,
    required: true
  },
  sellingPrice: {
    type: Number,
    min: 1,
    max: 100000000,
    required: true
  },
  mileage: {
    type: Number,
    min: 0,
    max: 100000000,
    required: true
  },
  photo: {
    Data: Buffer,
    ContentType: String
  },
  registrationNumber: {
    type: String,
    minLength: 6,
    maxLength: 23,
    required: true,
    unique: true
  },
  owner: {
    type: String,
    minLength: 3,
    maxLength: 30,
    required: true
  },
  address: {
    type: String,
    minLength: 4,
    maxLength: 100,
    required: true
  }
}, {
      timestamps: true
});

// cars is the name of the MongoDB collection
const CarModel = mongoose.model('cars', carSchema);
export {CarModel};