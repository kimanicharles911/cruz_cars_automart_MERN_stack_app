import './AllCarsComponent.css';
import { TwentyTwelveGMCSiearra1500SLT } from '../images';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrash, faPen, faEye } from '@fortawesome/free-solid-svg-icons';
import {useEffect, useState} from 'react';
import {Buffer} from 'buffer';

const AllCarsComponent = ({ allCarsProp, setAllCarsProp, renderAgentProp, setRenderAgentProp }) => {
// <img src="data:image/<%=image.img.contentType%>;base64, <%=image.img.data.toString('base64')%>">
  return (
    <section className="row mt-2 mr-2 gy-3" id="card-section">
      {allCarsProp.map((oneCar, index) => (
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
              <a title="Delete" href="#" type="button" data-bs-toggle="modal" data-bs-target="#deleteModal"><FontAwesomeIcon icon={faTrash} className="font-awesome-icons fas fa-trash-alt fa-crud-btns" id="trash-icon"/></a>

              {/* ### Edit Btn ### */}
              <a title="Edit" href="#" type="button" data-bs-toggle="modal" data-bs-target="#editModal"><FontAwesomeIcon icon={faPen} className="font-awesome-icons fas fa-pen fa-crud-btns" id="pen-icon"/></a>

              {/* ### View Btn ### */}
              <a title="View" href="#" type="button" data-bs-toggle="modal" data-bs-target="#viewModal"><FontAwesomeIcon icon={faEye} className="font-awesome-icons fas fa-eye fa-crud-btns" id="eye-icon"/></a>

            </div>
          </div>
        </div>
      ))}

      {/* Start Delete Modal */}
      <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="deleteModalLabel">Remove Confirmation</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <p className="text-center">Are you sure you want to permanently remove 2012 GMC Sierra 1500 SLT ?</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-danger">Proceed to Remove</button>
            </div>
          </div>
        </div>
      </div>
      {/* ### End of Delete Modal */}

      {/* ### Start of Edit Modal */}
      <div className="modal" id="editModal" tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-scrollable" role="document">
          <div className="modal-content shadow">
            <div className="modal-header pl-5 pr-5" id="edit-modal-header">
              <p className="h4 fw-bold mb-0 container-fluid">2012 GMC Sierra 1500 SLT</p>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body pl-5 pr-5 pt-0">
              <form>
                <div className="form-floating mb-3 mt-3">
                  <input type="number" className="form-control rounded-4" id="floatingAddCarModel" defaultValue="2012" placeholder="Model" />
                  <label htmlFor="floatingAddCarModel">Model</label>
                </div>
                <div className="form-floating mb-3 mt-3">
                  <input type="text" className="form-control rounded-4" id="floatingAddCarMake" defaultValue="GMC Sierra 1500 SLT" placeholder="Make" />
                  <label htmlFor="floatingAddCarMake">Make</label>
                </div>
                <div className="form-floating mb-3">
                  <input type="number" className="form-control rounded-4" id="floatingAddCarSellingPrice" defaultValue="29998" placeholder="Selling Price" />
                  <label htmlFor="floatingAddCarSellingPrice">Selling Price</label>
                </div>
                <div className="form-floating mb-3">
                  <input type="number" className="form-control rounded-4" id="floatingAddCarMileage" defaultValue="59" placeholder="Mileage" />
                  <label htmlFor="floatingAddCarMileage">Mileage</label>
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="floatingAddCarPhoto">Car Photo</label>
                  <input type="file" className="form-control rounded-4" id="floatingAddCarPhoto" />
                </div>
                <div className="form-floating mb-3">
                  <input type="text" className="form-control rounded-4" id="floatingAddCarRegistrationNumber" defaultValue="KDD 750C" placeholder="Registration Number" />
                  <label htmlFor="floatingAddCarRegistrationNumber">Registration Number</label>
                </div>
                <div className="form-floating mb-3 mt-3">
                  <input type="text" className="form-control rounded-4" id="floatingAddCarOwner" defaultValue="Hillary Clement" placeholder="Owner" />
                  <label htmlFor="floatingAddCarOwner">Owner</label>
                </div>
                <div className="form-floating mb-3 mt-3">
                  <input type="text" className="form-control rounded-4" id="floatingAddCarAddress" defaultValue="100, Baraka Rd, Dar-es-salaam" placeholder="Address" />
                  <label htmlFor="floatingAddCarAddress">Address</label>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-danger">Save changes</button>
            </div>
          </div>
        </div>
      </div>
      {/* ### End of Edit Modal */}

      {/* ### Start of View Modal */}
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
                  <img src={TwentyTwelveGMCSiearra1500SLT} className="col card-img-top" style={{ width: '18rem' }} />
                  <div className="col">
                    <h1 className="display-5">2012 GMC Sierra 1500 SLT</h1>
                    <p className="fs-5"><strong>Selling Price:</strong> $29,998</p>
                    <p className="fs-5"><strong>Mileage:</strong> 59K Mi</p>
                    <p className="fs-5"><strong>Registration Number:</strong> KDD 750C</p>
                  </div>
                </div>
                <div className="mt-3">
                  <p className="fs-5"><strong>Owner:</strong> Hillary Clement</p>
                  <p className="fs-5"><strong>Address:</strong> 100, Baraka Rd, Dar-es-salaam</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ### End of View Modal ### */}

    </section>
  )
};
export default AllCarsComponent;