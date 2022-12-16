import './EditModalComponent.css';
import {useState} from 'react';
import axios from 'axios';
import { Alert } from 'react-bootstrap';
import {axiosErrorMessage, axiosResponseMessage, formDataCreator} from '../../modules';

/* 
  * I first imported the styling.
  * I then imported the useState hook from react.
  * I imported the axios promise based http client.
  * I imported the Alert react-bootstrap component.
  * I imported custom axios and the formDataCreator modules.
*/

const EditModalComponent = ({modalDataProp, setModalDataProp, renderAgentProp, setRenderAgentProp}) => {

  const [showAlert, setShowAlert] = useState(false);

  const modelSpecChangeHandler = (event) => {
    try{
      setModalDataProp((prevState) => {
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
      setModalDataProp((prevState) => {
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
      setModalDataProp((prevState) => {
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
      setModalDataProp((prevState) => {
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
      setModalDataProp((prevState) => {
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
      setModalDataProp((prevState) => {
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
      setModalDataProp((prevState) => {
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
      setModalDataProp((prevState) => {
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
    if(isNaN(parseInt(modalDataProp.modelSpec))) return 'Check the Model field';
    if(modalDataProp.makeSpec.length < 4) return 'Check the Make field.';
    if(isNaN(parseInt(modalDataProp.sellingPrice)) || parseInt(modalDataProp.sellingPrice) < 1) return 'Check the Selling Price field';
    if(typeof(modalDataProp.photo) !== 'object') return 'Check the Photo field';
    if(modalDataProp.registrationNumber.length < 6) return 'Check Registration Number field';
    if(modalDataProp.owner.length < 3) return 'Check the Owner field';
    if(modalDataProp.address.length < 6) return 'Check the Address field';
    return true;
  };

  const saveChangesBtnHandler = async() => {
    try{
      if(validator() === true){
        const newObject = formDataCreator.moduleFunc(modalDataProp);
        await axios.patch(`https://cruzcarsapi.cyclic.app/api/v1/cars/car/${modalDataProp._id}`, newObject)
          .then(res => {
            axiosResponseMessage.moduleFunc(res);
          }).catch(err => {
            axiosErrorMessage.moduleFunc(err);
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
    * I created the EditModalComponent and destructured the modalDataProp, setModalDataProp, renderAgentProp and setRenderAgentProp passed from the AllCarsComponent.
    * I created a state variable called field and setField and set it's default value to an object whose keys are empty strings and numbers. It is where all the data from the add car form input fields will be stored.
    * I then created a state variable called showAlert and setShowAlert. It will be used to control the appearance of the form validation errors.
    * I created event handler functions for handling different kind of events. Most of this functions use setState callback functions to set the field state variable. This are:
        * The modelSpecChangeHandler which updates car model in the modalDataProp variable.
        * The makeSpecChangeHandler which updates car make in the modalDataProp variable.
        * The sellingPriceChangeHandler which updates car selling price in the modalDataProp variable.
        * The mileageChangeHandler which updates car mileage in the modalDataProp variable.
        * The photoChangeHandler which updates car photo in the modalDataProp variable.      
        * The registrationNumberChangeHandler which updates car registration number in the modalDataProp variable.
        * The ownerChangeHandler which updates car owner in the modalDataProp variable.
        * The addressChangeHandler which updates car address in the modalDataProp variable.
        * The validator function which checks if their is an empty or inappropriate form input in the whole modal using the field state variable.
        * The saveChangesBtnHandler function which has a condition which confirms all inputs are correct and an object whose value is received from the formDataCreator module.
    * The axios function has a try catch block that returns necessary responses in either case of a successful or failed car update to the API using the axiosResponseMessage and axiosErrorMessage modules.
    * After 250 ms the boolean value of the setRenderAgentProp state variable is changed causing a fetch from the API that updates the car data in the whole application.
  */

  return (
    <div className="modal" id="editModal" tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-scrollable" role="document">
        <div className="modal-content shadow">
          {showAlert ? 
            <Alert variant="danger" className="pb-0" onClose={() => setShowAlert(false)} dismissible>
              <p>{validator()}</p>
            </Alert>
            : null
          }
          <div className="modal-header pl-5 pr-5" id="edit-modal-header">
            <p className="h4 fw-bold mb-0 container-fluid">{modalDataProp.modelSpec} {modalDataProp.makeSpec}</p>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body pl-5 pr-5 pt-0">
            <form>
              <div className="form-floating mb-3 mt-3">
                <input type="number" className="form-control rounded-4" id="floatingEditCarModel" placeholder="Model" value={modalDataProp.modelSpec} onChange={modelSpecChangeHandler}/>
                <label htmlFor="floatingEditCarModel">Model</label>
              </div>
              <div className="form-floating mb-3 mt-3">
                <input type="text" className="form-control rounded-4" id="floatingEditCarMake" placeholder="Make" value={modalDataProp.makeSpec} onChange={makeSpecChangeHandler}/>
                <label htmlFor="floatingEditCarMake">Make</label>
              </div>
              <div className="form-floating mb-3">
                <input type="number" className="form-control rounded-4" id="floatingEditCarSellingPrice" placeholder="Selling Price" value={modalDataProp.sellingPrice} onChange={sellingPriceChangeHandler}/>
                <label htmlFor="floatingEditCarSellingPrice">Selling Price</label>
              </div>
              <div className="form-floating mb-3">
                <input type="number" className="form-control rounded-4" id="floatingEditCarMileage" placeholder="Mileage" value={modalDataProp.mileage} onChange={mileageChangeHandler}/>
                <label htmlFor="floatingEditCarMileage">Mileage</label>
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="floatingEditCarPhoto">Car Photo</label>
                <input type="file" className="form-control rounded-4" id="floatingEditCarPhoto" onChange={photoChangeHandler}/>
              </div>
              <div className="form-floating mb-3">
                <input type="text" className="form-control rounded-4" id="floatingEditCarRegistrationNumber" placeholder="Registration Number"  value={modalDataProp.registrationNumber} onChange={registrationNumberChangeHandler}/>
                <label htmlFor="floatingEditCarRegistrationNumber">Registration Number</label>
              </div>
              <div className="form-floating mb-3 mt-3">
                <input type="text" className="form-control rounded-4" id="floatingEditCarOwner" placeholder="Owner" value={modalDataProp.owner} onChange={ownerChangeHandler}/>
                <label htmlFor="floatingEditCarOwner">Owner</label>
              </div>
              <div className="form-floating mb-3 mt-3">
                <input type="text" className="form-control rounded-4" id="floatingEditCarAddress" placeholder="Address" value={modalDataProp.address} onChange={addressChangeHandler}/>
                <label htmlFor="floatingEditCarAddress">Address</label>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="button" className="btn btn-danger" data-bs-dismiss={validator() === true ? 'modal': ''} id="save-edit-changes-btn" onClick={saveChangesBtnHandler}>Save changes</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EditModalComponent;

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
      * The save changes button. It is used to call the saveChangesBtnHandler function that makes sure the edited car details are saved.
*/