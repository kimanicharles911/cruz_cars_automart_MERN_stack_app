import {useState} from 'react';
import axios from 'axios';
import './AddCarModalComponent.css';
import { Alert } from 'react-bootstrap';
import {axiosErrorMessage, axiosResponseMessage, formDataCreator} from '../../modules';

/* 
  * I first imported the useState hook from react.
  * I imported the axios promise based http client.
  * I then imported the styling.
  * I imported the Alert react-bootstrap component.
  * I imported custom axios and the formDataCreator modules.
*/

const AddCarModalComponent = ({ renderAgentProp, setRenderAgentProp }) => {

  const [field, setField] = useState({
    modelSpec: '',
    makeSpec: '',
    sellingPrice: 0,
    mileage: 0,
    photo: '',
    registrationNumber: '',
    owner: '',
    address: ''
  });
  const [showAlert, setShowAlert] = useState(false);

  const modelSpecChangeHandler = (event) => {
    try{
      setField((prevState) => {
        return{
          ...prevState,
          modelSpec: event.target.value
        }
      })
    }catch(err){
      console.error(err.message);
    }
  };

  const makeSpecChangeHandler = (event) => {
    try{
      setField((prevState) => {
        return{
          ...prevState,
          makeSpec: event.target.value
        }
      })
    }catch(err){
      console.error(err.message);
    }
  };

  const sellingPriceChangeHandler = (event) => {
    try{
      setField((prevState) => {
        return{
          ...prevState,
          sellingPrice: event.target.value
        }
      })
    }catch(err){
      console.error(err.message);
    }
  };

  const mileageChangeHandler = (event) => {
    try{
      setField((prevState) => {
        return{
          ...prevState,
          mileage: event.target.value
        }
      })
    }catch(err){
      console.error(err.message);
    }
  };

  const photoChangeHandler = (event) => {
    try{
      setField((prevState) => {
        return{
          ...prevState,
          photo: event.target.files[0]
        }
      })
    }catch(err){
      console.error(err.message);
    }
  };

  const registrationNumberChangeHandler = (event) => {
    try{
      setField((prevState) => {
        return{
          ...prevState,
          registrationNumber: event.target.value
        }
      })
    }catch(err){
      console.error(err.message);
    }
  };

  const ownerChangeHandler = (event) => {
    try{
      setField((prevState) => {
        return{
          ...prevState,
          owner: event.target.value
        }
      })
    }catch(err){
      console.error(err.message);
    }
  };

  const addressChangeHandler = (event) => {
    try{
      setField((prevState) => {
        return{
          ...prevState,
          address: event.target.value
        }
      })
    }catch(err){
      console.error(err.message);
    }
  };

  const validator = () => {
    if(isNaN(parseInt(field.modelSpec))) return 'Check the Model field';
    if(field.makeSpec.length < 4) return 'Check the Make field.';
    if(isNaN(parseInt(field.sellingPrice)) || parseInt(field.sellingPrice) < 1) return 'Check the Selling Price field';
    if(typeof(field.photo) !== 'object') return 'Check the Photo field';
    if(field.registrationNumber.length < 6) return 'Check Registration Number field';
    if(field.owner.length < 3) return 'Check the Owner field';
    if(field.address.length < 6) return 'Check the Address field';
    return true;
  };

  const addCarBtnHandler = async() => {
    try{
      if(validator() === true){
        const newObject = formDataCreator.moduleFunc(field);
        await axios.post('/api/v1/cars/car', newObject)
          .then(res => {
            axiosResponseMessage.moduleFunc(res);
          }).catch(err => {
            axiosErrorMessage.moduleFunc(err);
          })
        
        setField({
          modelSpec: '',
          makeSpec: '',
          sellingPrice: 0,
          mileage: 0,
          photo: '',
          registrationNumber: '',
          owner: '',
          address: ''
        })
                
        setRenderAgentProp(!renderAgentProp);
      }else{
        setShowAlert(true);
      }
    }catch(err){
      console.error(err.message)
    }
  };
  
  /* 
    * I created the AddCarModalComponent and destructured the renderAgentProp and setRenderAgentProp passed from the NavbarComponent.
    * I created a state variable called field and setField and set it's default value to an object whose keys are empty strings and numbers. It is where all the data from the add car form input fields will be stored.
    * I then created a state variable called showAlert and setShowAlert. It will be used to control the appearance of the form validation errors.
    * I created event handler functions for handling different kind of events. Most of this functions use setState callback functions to set the field state variable. This are:
        * The modelSpecChangeHandler which stores the new car model in the field variable.
        * The makeSpecChangeHandler which stores the new car make in the field variable.
        * The sellingPriceChangeHandler which stores the new car selling price in the field variable.
        * The mileageChangeHandler which stores the new car mileage in the field variable.
        * The photoChangeHandler which stores the new car photo in the field variable.      
        * The registrationNumberChangeHandler which stores the new car registration number in the field variable.
        * The ownerChangeHandler which stores the new car owner in the field variable.
        * The addressChangeHandler which stores the new car address in the field variable.
        * The validator function which checks if their is an empty or inappropriate form input in the whole modal using the field state variable.
        * The addCarBtnHandler function which has a condition which confirms all inputs are correct and an object whose value is received from the formDataCreator module.
    * The axios function has a try catch block that returns necessary responses in either case of a successful or failed car addition to the API using the axiosResponseMessage and axiosErrorMessage modules. 
    * I then re-initialize the field variable.
    * After 250 ms the boolean value of the setRenderAgentProp state variable is changed causing a fetch from the API that updates the car data in the whole application.
  */

  return (
    <div className="modal" id="addCarModal" tabIndex="-1" aria-labelledby="addCarModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-scrollable" role="document">
        <div className="modal-content shadow">
          {showAlert ? 
            <Alert variant="danger" className="pb-0" onClose={() => setShowAlert(false)} dismissible>
              <p>{validator()}</p>
            </Alert>
            : null
          }
          <div className="modal-header pl-5 pr-5" id="add-car-modal-header">
            <p className="h4 fw-bold mb-0 container-fluid">New Car</p>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body pl-5 pr-5 pt-0">
            <form>
              <div className="form-floating mb-3 mt-3">
                <input type="number" className="form-control rounded-4" id="floatingAddCarModel" placeholder="Model" value={field.modelSpec} onChange={modelSpecChangeHandler}/>
                <label htmlFor="floatingAddCarModel">Model</label>
              </div>
              <div className="form-floating mb-3 mt-3">
                <input type="text" className="form-control rounded-4" id="floatingAddCarMake" placeholder="Make" value={field.makeSpec} onChange={makeSpecChangeHandler}/>
                <label htmlFor="floatingAddCarMake">Make</label>
              </div>
              <div className="form-floating mb-3">
                <input type="number" className="form-control rounded-4" id="floatingAddCarSellingPrice" placeholder="Selling Price" value={field.sellingPrice} onChange={sellingPriceChangeHandler}/>
                <label htmlFor="floatingAddCarSellingPrice">Selling Price</label>
              </div>
              <div className="form-floating mb-3">
                <input type="number" className="form-control rounded-4" id="floatingAddCarMileage" placeholder="Mileage" value={field.mileage} onChange={mileageChangeHandler}/>
                <label htmlFor="floatingAddCarMileage">Mileage</label>
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="floatingAddCarPhoto">Car Photo</label>
                <input type="file" className="form-control rounded-4" id="floatingAddCarPhoto" onChange={photoChangeHandler}/>
              </div>
              <div className="form-floating mb-3">
                <input type="text" className="form-control rounded-4" id="floatingAddCarRegistrationNumber" placeholder="Registration Number" value={field.registrationNumber} onChange={registrationNumberChangeHandler}/>
                <label htmlFor="floatingAddCarRegistrationNumber">Registration Number</label>
              </div>
              <div className="form-floating mb-3 mt-3">
                <input type="text" className="form-control rounded-4" id="floatingAddCarOwner" placeholder="Owner" value={field.owner} onChange={ownerChangeHandler}/>
                <label htmlFor="floatingAddCarOwner">Owner</label>
              </div>
              <div className="form-floating mb-3 mt-3">
                <input type="text" className="form-control rounded-4" id="floatingAddCarAddress" placeholder="Address" value={field.address} onChange={addressChangeHandler}/>
                <label htmlFor="floatingAddCarAddress">Address</label>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="button" className="btn btn-danger" data-bs-dismiss={validator() === true ? 'modal': ''} id="save-changes-btn" onClick={addCarBtnHandler}>Add Car</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddCarModalComponent;

/* 
  => This modal has 8 major JSX items which all use two way binding of the value and onChange attributes:
      * The car model input. It is set from the modelSpec field object value and calls the modelSpecChangeHandler function on change.
      * The car make input. It is set from the makeSpec field object value and calls the makeSpecChangeHandler function on change.
      * The car selling price input. It is set from the sellingPrice field object value and calls the sellingPriceChangeHandler function on change.
      * The car mileage input. It is set from the mileage field object value and calls the mileageChangeHandler function on change.
      * The car photo input. It is set from the photo field object value and calls the photoChangeHandler function on change.
      * The car registration number input. It is set from the registrationNumber field object value and calls the registrationNumberChangeHandler function on change.
      * The car owner input. It is set from the owner field object value and calls the ownerChangeHandler function on change.
      * The car address input. It is set from the address field object value and calls the addressChangeHandler function on change.
      * The add car button. It is used to call the addCarBtnHandler function that makes sure the new car is created and saved.
*/