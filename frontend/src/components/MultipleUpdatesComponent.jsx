import './MultipleUpdatesComponent.css';
import { useState, Fragment } from 'react';
import axios from 'axios';
import {axiosErrorMessage, axiosResponseMessage, formDataCreator} from '../modules';

const MultipleUpdatesComponent = ({ renderAgentProp, setRenderAgentProp, allCarsProp, setAllCarsProp}) => {

  const [indexesOfUpdatedCars, setIndexesOfUpdatedCars] = useState([]);

  const modelSpecChangeHandler = (event, carId, index) => {
    try{
      const untouchedCarsArr = allCarsProp.filter(car => car._id !== carId);
      const touchedCarArr = allCarsProp.filter(car => car._id === carId);
      event.target.value.length > 0 ? touchedCarArr[0].modelSpec = parseInt(event.target.value) : touchedCarArr[0].modelSpec = "";
      untouchedCarsArr.splice(index, 0, touchedCarArr[0]);
      setAllCarsProp(untouchedCarsArr);
      addIndexFunc(index);
    }catch(err){
      console.error(err.message);
    }
  };

  const makeSpecChangeHandler = (event, carId, index) => {
    try{
      const untouchedCarsArr = allCarsProp.filter(car => car._id !== carId);
      const touchedCarArr = allCarsProp.filter(car => car._id === carId);
      touchedCarArr[0].makeSpec = event.target.value;
      untouchedCarsArr.splice(index, 0, touchedCarArr[0]);
      setAllCarsProp(untouchedCarsArr);
      addIndexFunc(index);
    }catch(err){
      console.error(err.message);
    }
  };

  const sellingPriceChangeHandler = (event, carId, index) => {
    try{
      const untouchedCarsArr = allCarsProp.filter(car => car._id !== carId);
      const touchedCarArr = allCarsProp.filter(car => car._id === carId);
      event.target.value.length > 0 ? touchedCarArr[0].sellingPrice = parseInt(event.target.value) : touchedCarArr[0].sellingPrice = "";
      untouchedCarsArr.splice(index, 0, touchedCarArr[0]);
      setAllCarsProp(untouchedCarsArr);
      addIndexFunc(index);
    }catch(err){
      console.error(err.message);
    }
  };

  const mileageChangeHandler = (event, carId, index) => {
    try{
      const untouchedCarsArr = allCarsProp.filter(car => car._id !== carId);
      const touchedCarArr = allCarsProp.filter(car => car._id === carId);
      event.target.value.length > 0 ? touchedCarArr[0].mileage = parseInt(event.target.value) : touchedCarArr[0].mileage = "";
      untouchedCarsArr.splice(index, 0, touchedCarArr[0]);
      setAllCarsProp(untouchedCarsArr);
      addIndexFunc(index);
    }catch(err){
      console.error(err.message);
    }
  };

  const photoChangeHandler = (event, carId, index) => {
    try{
      const untouchedCarsArr = allCarsProp.filter(car => car._id !== carId);
      const touchedCarArr = allCarsProp.filter(car => car._id === carId);
      touchedCarArr[0].photo = event.target.files[0];
      untouchedCarsArr.splice(index, 0, touchedCarArr[0]);
      setAllCarsProp(untouchedCarsArr);
      addIndexFunc(index);
    }catch(err){
      console.error(err.message);
    }
  };

  const registrationNumberChangeHandler = (event, carId, index) => {
    try{
      const untouchedCarsArr = allCarsProp.filter(car => car._id !== carId);
      const touchedCarArr = allCarsProp.filter(car => car._id === carId);
      touchedCarArr[0].registrationNumber = event.target.value;
      untouchedCarsArr.splice(index, 0, touchedCarArr[0]);
      setAllCarsProp(untouchedCarsArr);
    }catch(err){
      console.error(err.message);
    }
  };

  const ownerChangeHandler = (event, carId, index) => {
    try{
      const untouchedCarsArr = allCarsProp.filter(car => car._id !== carId);
      const touchedCarArr = allCarsProp.filter(car => car._id === carId);
      touchedCarArr[0].owner = event.target.value;
      untouchedCarsArr.splice(index, 0, touchedCarArr[0]);
      setAllCarsProp(untouchedCarsArr);
      addIndexFunc(index);
    }catch(err){
      console.error(err.message);
    }
  };

  const addressChangeHandler = (event, carId, index) => {
    try{
      const untouchedCarsArr = allCarsProp.filter(car => car._id !== carId);
      const touchedCarArr = allCarsProp.filter(car => car._id === carId);
      touchedCarArr[0].address = event.target.value;
      untouchedCarsArr.splice(index, 0, touchedCarArr[0]);
      setAllCarsProp(untouchedCarsArr);
      addIndexFunc(index);
    }catch(err){
      console.error(err.message);
    }
  };

  const addIndexFunc = (index) => {
    if(!indexesOfUpdatedCars.includes(index)){
      setIndexesOfUpdatedCars((prevState) => {
        return[
          ...prevState,
          index
        ]
      })
    }
  };

  const saveChangesBtnHandler = async() => {
    try{
      for(const oneCar of allCarsProp){
        for(const oneIndex of indexesOfUpdatedCars){
          if(allCarsProp.indexOf(oneCar) === oneIndex){
            const newObject = formDataCreator.moduleFunc(oneCar);
            await axios.patch(`/api/v1/cars/car/${oneCar._id}`, newObject)
              .then(res => {
                axiosResponseMessage.moduleFunc(res);
              }).catch(err => {
                axiosErrorMessage.moduleFunc(err);
              })
      
              setTimeout(() => {
                setRenderAgentProp(!renderAgentProp);
              }, 250);
          }
        }
      }
    }catch(err){
      console.error(err.message)
    }
  };

  return(
    <section className="container container-fluid">
      <form>
        <div className="row justify-content-end">
          <button type="button" className="col-2 btn btn-secondary">Discard Changes</button>&nbsp;
          <button type="button" className="col-2 btn btn-danger" onClick={saveChangesBtnHandler}>Save Changes</button>
        </div>
        <hr/>
        {allCarsProp.map((oneCar, index) => (
          <Fragment key={oneCar._id}>
            <div className="row g-1 align-items-center form-inline">
              <p className="col-auto">{index + 1}.&nbsp;</p>
              <div className="col-auto">
                <input type="text" className="form-control" placeholder="Model" value={oneCar.modelSpec} onChange={ (event) => modelSpecChangeHandler(event, oneCar._id, index)}/>
              </div>
              <div className="col-auto">
                <input type="text" className="form-control" placeholder="Make" value={oneCar.makeSpec} onChange={ (event) => makeSpecChangeHandler(event, oneCar._id, index)}/>
              </div>
              <div className="col-auto">
                <input type="text" className="form-control" placeholder="Selling Price" value={oneCar.sellingPrice} onChange={ (event) => sellingPriceChangeHandler(event, oneCar._id, index)}/>
              </div>
              <div className="col-auto mx-4">
                <input type="text" className="form-control" placeholder="Mileage" value={oneCar.mileage} onChange={ (event) => mileageChangeHandler(event, oneCar._id, index)}/>
              </div>
              <div className="col-auto">
                <input type="file" className="form-control" placeholder="" onChange={ (event) => photoChangeHandler(event, oneCar._id, index)}/>
              </div>
              <div className="col-auto">
                <input type="text" className="form-control" placeholder="Registration Number" value={oneCar.registrationNumber} onChange={ (event) => registrationNumberChangeHandler(event, oneCar._id, index)}/>
              </div>
              <div className="col-auto mx-4">
                <input type="text" className="form-control" placeholder="Owner" value={oneCar.owner} onChange={ (event) => ownerChangeHandler(event, oneCar._id, index)}/>
              </div>
              <div className="col-auto">
                <input type="text" className="form-control" placeholder="Address" value={oneCar.address} onChange={ (event) => addressChangeHandler(event, oneCar._id, index)}/>
              </div>
            </div>
            <hr/>
          </Fragment>
        ))}

        <div className="row justify-content-end mb-3">
          <button type="button" className="col-2 btn btn-secondary">Discard Changes</button>&nbsp;
          <button type="button" className="col-2 btn btn-danger" onClick={saveChangesBtnHandler}>Save Changes</button>
        </div>
      </form>
    </section>
  )
};
export default MultipleUpdatesComponent;