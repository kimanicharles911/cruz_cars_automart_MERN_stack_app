import './MultipleUpdatesComponent.css';
import { useState, Fragment } from 'react';
import axios from 'axios';
import { Alert } from 'react-bootstrap';
import {axiosErrorMessage, axiosResponseMessage, formDataCreator} from '../modules';

/* 
  * I first imported the styling.
  * I then imported the useState hook and Fragment component from react.
  * I imported the axios promise based http client.
  * I imported the Alert react-bootstrap component.
  * I imported custom axios and the formDataCreator modules.
*/

const MultipleUpdatesComponent = ({ renderAgentProp, setRenderAgentProp, allCarsProp, setAllCarsProp}) => {

  const [indexesOfUpdatedCars, setIndexesOfUpdatedCars] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

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

  const validator = () => {
    for(const oneCar of allCarsProp){
      for(const oneIndex of indexesOfUpdatedCars){
        if(allCarsProp.indexOf(oneCar) === oneIndex){
          if(isNaN(parseInt(oneCar.modelSpec))) return 'Check the Model field';
          if(oneCar.makeSpec.length < 4) return 'Check the Make field.';
          if(isNaN(parseInt(oneCar.sellingPrice)) || parseInt(oneCar.sellingPrice) < 1) return 'Check the Selling Price field';
          if(typeof(oneCar.photo) !== 'object') return 'Check the Photo field';
          if(oneCar.registrationNumber.length < 6) return 'Check Registration Number field';
          if(oneCar.owner.length < 3) return 'Check the Owner field';
          if(oneCar.address.length < 6) return 'Check the Address field';
          return true;
        }
      }
    }
  };

  const saveChangesBtnHandler = async() => {
    try{
      if(validator() === true){
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
                
                setRenderAgentProp(!renderAgentProp);
            }
          }
        }

        setIndexesOfUpdatedCars([]);

      }else{
        setShowAlert(true);
      }
    }catch(err){
      console.error(err.message)
    }
  };
  
  /* 
    * I created the MultipleUpdatesComponent and destructured the renderAgentProp, setRenderAgentProp, allCarsProp and setAllCarsProp passed from the App Component.
    * I created a state variable called indexesOfUpdatedCars and setIndexesOfUpdatedCars and set it's default value to an empty array.
    * I then created a state variable called showAlert and setShowAlert. It will be used to control the appearance of the form validation errors.
    * I created 8 event handler functions for handling different kind of events. Each event handler 
      * Stores the cars the user is not currently editing it's data in the untouchedCarsArr and the one the user is updating in touchedCarArr.
      * Sets the key it is dealing with of the touchedCarArr's element to the user input or an empty string if the user deletes the previous value of the key it is dealing with.
      * Adds the element in the touchedCarArr to the untouchedCarsArr at the same array position it was before the user edited it's data.
      * Sets allCarsProp to the untouchedCarsArr which contains car data including the latest user's input.
      * Calls the addIndexFunc passing the index of the affected car as a parameter.
    * I created the addIndexFunc whuich add the index of every updated car to the indexesOfUpdatedCars state variable if it does not already exist in it.
    * The validator function which checks if their are any empty or inappropriate form inputs of the cars whose data has been updated.
    * The saveChangesBtnHandler function which has a condition which confirms all inputs of the cars whose data has been updated are correct and an object whose value is received from the formDataCreator module.
    * The axios function has a try catch block in the saveChangesBtnHandler returns necessary responses in either case of a successful or failed car update to the API using the axiosResponseMessage and axiosErrorMessage modules.
    * After 250 ms the boolean value of the setRenderAgentProp state variable is changed causing a fetch from the API that updates the car data in the whole application.
    * I then set the indexesOfUpdatedCars to an empty array.
    * If a form input of an updated car is empty or inappropriate an alert is shown to the client through the setShowAlert state variable.
  */

  return(
    <section className="container container-fluid">
      {showAlert ? 
        <Alert variant="danger" className="pb-0" onClose={() => setShowAlert(false)} dismissible>
          <p>{validator()}</p>
        </Alert>
        : null
      }
      <form>
        <div className="row justify-content-end">
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
          <button type="button" className="col-2 btn btn-danger" onClick={saveChangesBtnHandler}>Save Changes</button>
        </div>
      </form>
    </section>
  )
};
export default MultipleUpdatesComponent;
/* 
  * I wrote the JSX for the main part of the application.
  * There are 10 main JSX components. This are the validation alert component, save changes button, the model, make, selling price, mileage, photo, registration number, owner and address form inputs.
  * All form inputs are rendered programmatically via a map which loops through all cars in the allCarsProp.
  * All form inputs except the photo have their value set from the allCarsProp.
  * All form inputs have an onchange attribute that calls the respective inputs change handling function passing three parameters i.e the event, carId and index of the car in the allCarsProp.
*/