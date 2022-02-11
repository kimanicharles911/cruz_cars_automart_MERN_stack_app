import './AllCarsComponent.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPen, faEye } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { Buffer } from 'buffer';
import { ViewModalComponent, EditModalComponent, DeleteModalComponent } from '../components';

/* 
  * I first imported the styling.
  * I imported the FontAwesomeIcon component, faTrash, faPen and faEye icons which are all products of the font-awesome library.
  * I then imported the useState hook from react.
  * I imported the Buffer library which will be used to convert the binary of an image to a normal image file.
  * I imported the ViewModalComponent, EditModalComponent and DeleteModalComponent from the components folder.
*/

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
    for (const oneCar of allCarsProp) {
      if (oneCar._id === selectedCarId) {
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

  /* 
    * I created the AllCarsComponent and destructured the allCarsProp, renderAgentProp and setRenderAgentProp.
    * I created a state variable called modalData and setModalData and set it's default value to an object whose key values are empty strings. It is where all the car data of the car the user is interacting with is stored.
    * I created the carIdReceiverFunc function which receives the car ID of the car the user is interacting with and then all of the data of that car is stored in the modalData state variable.   
  */

  return (
    <section className="row mt-2 mr-2 gy-3" id="card-section">
      {allCarsProp.map((oneCar) => (
        <div className="card mx-1" style={{ width: '16.75rem' }} key={oneCar._id}>
          <img src={`data:${oneCar.photo.ContentType};base64, ${Buffer.from(oneCar.photo.Data.data).toString('base64')}`} alt="2012-GMC-siearra-1500-SLT.webp" className="card-img-top"/>
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
              <a title="Delete" href="/#" type="button" data-bs-toggle="modal" data-bs-target="#deleteModal" onClick={() => carIdReceiverFunc(oneCar._id)}><FontAwesomeIcon icon={faTrash} className="font-awesome-icons fas fa-trash-alt fa-crud-btns" id="trash-icon" /></a>

              {/* ### Edit Btn ### */}
              <a title="Edit" href="/#" type="button" data-bs-toggle="modal" data-bs-target="#editModal" onClick={() => carIdReceiverFunc(oneCar._id)}><FontAwesomeIcon icon={faPen} className="font-awesome-icons fas fa-pen fa-crud-btns" id="pen-icon" /></a>

              {/* ### View Btn ### */}
              <a title="View" href="/#" type="button" data-bs-toggle="modal" data-bs-target="#viewModal" onClick={() => carIdReceiverFunc(oneCar._id)}><FontAwesomeIcon icon={faEye} className="font-awesome-icons fas fa-eye fa-crud-btns" id="eye-icon" /></a>

            </div>
          </div>
        </div>
      ))}

      <DeleteModalComponent modalDataProp={modalData} renderAgentProp={renderAgentProp} setRenderAgentProp={setRenderAgentProp} />

      <EditModalComponent modalDataProp={modalData} setModalDataProp={setModalData} renderAgentProp={renderAgentProp} setRenderAgentProp={setRenderAgentProp} />

      <ViewModalComponent modalDataProp={modalData} />

    </section>
  )
};
export default AllCarsComponent;
/* 
  * I wrote the JSX for the main part of the application.
  * The main function in the application is a map function that creates bootstrap cards with the photo, model, make, price and mileage of each car it loops through. 
  * The other main JSX items are the Delete, Edit and View Buttons which are used to open their respective modals. They also send the car ID to the carIdReceiverFunc function so as to enable identification of the car the user is interacting with.
  * I then wrapped the other three main components i.e ViewModalComponent, EditModalComponent and DeleteModalComponent.
  * In each of the above components I passed the props needed for the modal to operate as expected.
*/

/* 
  REFERENCES
  ==========>
  1. Upload and Retrieve Image on MongoDB using Mongoose
https://www.geeksforgeeks.org/upload-and-retrieve-image-on-mongodb-using-mongoose/
  2. Node.js get file extension
  https://stackoverflow.com/a/67934955/9497346
  3. How to upload/store images in MongoDB using Node.js, Express & Multer
  https://www.bezkoder.com/node-js-upload-store-images-mongodb/
  4. https://khanasadkhan48.medium.com/. how-to-upload-a-image-to-react-express-and-how-to-store-it-in-mongodb-using-buffer-type-e82d5751da79
  5. https://www.youtube.com/watch?v=KoWTJ5XiYm4
  6. https://www.youtube.com/watch?v=SqbrovwhZ_o
  7. https://www.youtube.com/watch?v=b6Oe2puTdMQ
  8. https://attacomsian.com/blog/uploading-files-nodejs-express
*/