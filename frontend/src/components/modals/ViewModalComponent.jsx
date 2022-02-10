import './ViewModalComponent.css';
import { Buffer } from 'buffer';
/* 
  * I imported the styling from ViewModalComponent.css 
  * I imported the Buffer library which will be used to convert the binary of an image to a normal image file.
*/

const ViewModalComponent = ({ modalDataProp }) => {

  return (
    <div className="modal py-5" id="viewModal" tabIndex="-1" aria-labelledby="viewModalLabel" aria-hidden="true" >
      <div className="modal-dialog modal-xl" >
        <div className="modal-content shadow">
          <div className="pt-0 card">
            <div className="modal-header py-1" id="view-modal-header">
              <br />
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="card-body">
              <div className="row">
                <img src={`data:${modalDataProp.photo.ContentType};base64, ${modalDataProp.photo.Data !== undefined && modalDataProp.photo.Data.type === 'Buffer' ? Buffer.from(modalDataProp.photo.Data.data).toString('base64') : null}`} className="col card-img-top" style={{ width: '18rem' }} alt=""/>
                <div className="col">
                  <h1 className="display-5">{modalDataProp.modelSpec} {modalDataProp.makeSpec}</h1>
                  <p className="fs-5"><strong>Selling Price:</strong> ${modalDataProp.sellingPrice}</p>
                  <p className="fs-5"><strong>Mileage:</strong> {modalDataProp.mileage} Mi</p>
                  <p className="fs-5"><strong>Registration Number:</strong> {modalDataProp.registrationNumber}</p>
                </div>
              </div>
              <div className="mt-3">
                <p className="fs-5"><strong>Owner:</strong> {modalDataProp.owner}</p>
                <p className="fs-5"><strong>Address:</strong> {modalDataProp.address}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};
export default ViewModalComponent;
/* 
  => I created the ViewModalComponent and destructured the modalDataProp received from the AllCarsComponent
  => This modal has 7 major JSX items:
      * The car image. It is set from the photo modalDataProp object value.
      * The car name. It is set from the modelSpec and makeSpec modalDataProp object value.
      * The selling price. It is set from the repoWebsiteUrl sellingPrice object values.
      * The mileage. It is set from the mileage modalDataProp object value.
      * The registration number. It is set from the registrationNumber modalDataProp object value.
      * The owner. It is set from the owner modalDataProp object value.
      * The address. It is set from the address modalDataProp object value.
*/