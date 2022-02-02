import './AllCarsComponent.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrash, faPen, faEye } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import {Buffer} from 'buffer';
import {ViewModalComponent, EditModalComponent, DeleteModalComponent} from '../components';

const AllCarsComponent = ({ allCarsProp, renderAgentProp, setRenderAgentProp }) => {

  const [modalData, setModalData] = useState({
    _id: '',
    modelSpec: '',
    makeSpec: '',
    sellingPrice: '',
    mileage: '',
    photo: '',
    registrationNumber: '',
    owner: '',
    address: ''
  });
  
  const carIdReceiverFunc = (selectedCarId) => {
    for(const oneCar of allCarsProp){
      if(oneCar._id === selectedCarId){
        setModalData({
          _id: oneCar._id,
          modelSpec: oneCar.modelSpec,
          makeSpec: oneCar.makeSpec,
          sellingPrice: oneCar.sellingPrice,
          mileage: oneCar.mileage,
          photo: oneCar.photo,
          registrationNumber: oneCar.registrationNumber,
          owner: oneCar.owner,
          address: oneCar.address
        })
      }
    }
  };

  return (
    <section className="row mt-2 mr-2 gy-3" id="card-section">
      {allCarsProp.map((oneCar) => (
        <div className="card mx-1" style={{ width: '16.75rem' }} key={oneCar._id}>
          <img src={`data:${oneCar.photo.ContentType};base64, ${Buffer.from(oneCar.photo.Data.data).toString('base64')}`} alt="2012-GMC-siearra-1500-SLT.webp" className="card-img-top" />
          <div className="card-body">
            <div className="row">
              <h5 className="col card-title">{oneCar.modelSpec} {oneCar.makeSpec}</h5>
            </div>
            <div className="row">
              <p className="col card-text">Price: ${oneCar.sellingPrice}</p>
              <p className="col card-text">Mileage: {oneCar.mileage} miles</p>
            </div>
            <div className="buttons d-flex flex-row-reverse">

              {/* ### Delete Modal Btn ### */}
              <a title="Delete" href="#" type="button" data-bs-toggle="modal" data-bs-target="#deleteModal" onClick={() => carIdReceiverFunc(oneCar._id)}><FontAwesomeIcon icon={faTrash} className="font-awesome-icons fas fa-trash-alt fa-crud-btns" id="trash-icon"/></a>

              {/* ### Edit Btn ### */}
              <a title="Edit" href="#" type="button" data-bs-toggle="modal" data-bs-target="#editModal" onClick={() => carIdReceiverFunc(oneCar._id)}><FontAwesomeIcon icon={faPen} className="font-awesome-icons fas fa-pen fa-crud-btns" id="pen-icon"/></a>

              {/* ### View Btn ### */}
              <a title="View" href="#" type="button" data-bs-toggle="modal" data-bs-target="#viewModal" onClick={() => carIdReceiverFunc(oneCar._id)}><FontAwesomeIcon icon={faEye} className="font-awesome-icons fas fa-eye fa-crud-btns" id="eye-icon"/></a>

            </div>
          </div>
        </div>
      ))}

      <DeleteModalComponent modalDataProp={modalData} renderAgentProp={renderAgentProp} setRenderAgentProp={setRenderAgentProp}/>

      <EditModalComponent modalDataProp={modalData} setModalDataProp={setModalData} renderAgentProp={renderAgentProp}  setRenderAgentProp={setRenderAgentProp}/>

      <ViewModalComponent modalDataProp={modalData}/>

    </section>
  )
};
export default AllCarsComponent;