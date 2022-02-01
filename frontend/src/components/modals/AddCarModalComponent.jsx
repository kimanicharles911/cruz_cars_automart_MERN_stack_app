import {useState} from 'react';
import axios from 'axios';
import './AddCarModalComponent.css';
import {axiosErrorMessage, axiosResponseMessage, objectCreator, formDataCreator} from '../../modules';

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

  const createModelSpecChangeHandler = (event) => {
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

  const createMakeSpecChangeHandler = (event) => {
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

  const createSellingPriceChangeHandler = (event) => {
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

  const createMileageChangeHandler = (event) => {
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

  const createPhotoChangeHandler = (event) => {
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

  const createRegistrationNumberChangeHandler = (event) => {
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

  const createOwnerChangeHandler = (event) => {
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

  const createAddressChangeHandler = (event) => {
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

  const addCarBtnHandler = () => {
    try{
      const newObject = formDataCreator.moduleFunc(field);
      axios.post('/api/v1/cars/car', newObject)
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
      
      setTimeout(() => {
        setRenderAgentProp(!renderAgentProp);
      }, 250);
    }catch(err){
      console.error(err.message)
    }
  };

  return (
    <div className="modal" id="addCarModal" tabIndex="-1" aria-labelledby="addCarModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-scrollable" role="document">
        <div className="modal-content shadow">
          <div className="modal-header pl-5 pr-5" id="add-car-modal-header">
            <p className="h4 fw-bold mb-0 container-fluid">New Car</p>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body pl-5 pr-5 pt-0">
            <form>
              <div className="form-floating mb-3 mt-3">
                <input type="number" className="form-control rounded-4" id="floatingAddCarModel" placeholder="Model" value={field.modelSpec} onChange={createModelSpecChangeHandler}/>
                <label htmlFor="floatingAddCarModel">Model</label>
              </div>
              <div className="form-floating mb-3 mt-3">
                <input type="text" className="form-control rounded-4" id="floatingAddCarMake" placeholder="Make" value={field.makeSpec} onChange={createMakeSpecChangeHandler}/>
                <label htmlFor="floatingAddCarMake">Make</label>
              </div>
              <div className="form-floating mb-3">
                <input type="number" className="form-control rounded-4" id="floatingAddCarSellingPrice" placeholder="Selling Price" value={field.sellingPrice} onChange={createSellingPriceChangeHandler}/>
                <label htmlFor="floatingAddCarSellingPrice">Selling Price</label>
              </div>
              <div className="form-floating mb-3">
                <input type="number" className="form-control rounded-4" id="floatingAddCarMileage" placeholder="Mileage" value={field.mileage} onChange={createMileageChangeHandler}/>
                <label htmlFor="floatingAddCarMileage">Mileage</label>
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="floatingAddCarPhoto">Car Photo</label>
                <input type="file" className="form-control rounded-4" id="floatingAddCarPhoto" onChange={createPhotoChangeHandler}/>
              </div>
              <div className="form-floating mb-3">
                <input type="text" className="form-control rounded-4" id="floatingAddCarRegistrationNumber" placeholder="Registration Number" value={field.registrationNumber} onChange={createRegistrationNumberChangeHandler}/>
                <label htmlFor="floatingAddCarRegistrationNumber">Registration Number</label>
              </div>
              <div className="form-floating mb-3 mt-3">
                <input type="text" className="form-control rounded-4" id="floatingAddCarOwner" placeholder="Owner" value={field.owner} onChange={createOwnerChangeHandler}/>
                <label htmlFor="floatingAddCarOwner">Owner</label>
              </div>
              <div className="form-floating mb-3 mt-3">
                <input type="text" className="form-control rounded-4" id="floatingAddCarAddress" placeholder="Address" value={field.address} onChange={createAddressChangeHandler}/>
                <label htmlFor="floatingAddCarAddress">Address</label>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="button" className="btn btn-danger" data-bs-dismiss="modal" id="save-changes-btn" onClick={addCarBtnHandler}>Add Car</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddCarModalComponent;