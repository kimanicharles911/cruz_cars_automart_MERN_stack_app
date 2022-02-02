import './EditModalComponent.css';
import axios from 'axios';
import {axiosErrorMessage, axiosResponseMessage, formDataCreator} from '../../modules';

const EditModalComponent = ({modalDataProp, setModalDataProp, renderAgentProp, setRenderAgentProp}) => {

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

  const saveChangesBtnHandler = async() => {
    try{
      const newObject = formDataCreator.moduleFunc(modalDataProp);
      await axios.patch(`/api/v1/cars/car/${modalDataProp._id}`, newObject)
        .then(res => {
          axiosResponseMessage.moduleFunc(res);
        }).catch(err => {
          axiosErrorMessage.moduleFunc(err);
        })
      
      setTimeout(() => {
        setRenderAgentProp(!renderAgentProp);
      }, 250);
    }catch(err){
      console.error(err.message)
    }
  };

  return (
    <div className="modal" id="editModal" tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-scrollable" role="document">
        <div className="modal-content shadow">
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
            <button type="button" className="btn btn-danger" data-bs-dismiss="modal" id="save-edit-changes-btn" onClick={saveChangesBtnHandler}>Save changes</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EditModalComponent;