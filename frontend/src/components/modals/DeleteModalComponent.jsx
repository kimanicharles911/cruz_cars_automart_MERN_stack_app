import axios from 'axios';
import {axiosErrorMessage, axiosResponseMessage} from '../../modules';
/* 
  * I imported the axios promise based http client. 
  * I imported custom axios modules.
*/

const DeleteModalComponent = ({modalDataProp, renderAgentProp, setRenderAgentProp}) => {

  const deleteCarBtnHandler = async() => {
    await axios.delete(`/api/v1/cars/car/${modalDataProp._id}`)
      .then(res => {
        axiosResponseMessage.moduleFunc(res);
      }).catch(err => {
        axiosErrorMessage.moduleFunc(err);
      })

    setTimeout(() => {
      setRenderAgentProp(!renderAgentProp);
    }, 250)
  }

  /* 
    * I created the DeleteModalComponent and destructured the modalDataProp, renderAgentProp and setRenderAgentProp passed from the AllCarsComponent.
    * The deleteCarBtnHandler which deletes the car the user has chosen to delete from the API.
    * The axios function has a try catch block that returns necessary responses in either case of a successful or failed car deletion in the API using the axiosResponseMessage and axiosErrorMessage modules.
    * After 250 ms the boolean value of the setRenderAgentProp state variable is changed causing a fetch from the API that updates the car data in the whole application.
  */

  return (
    <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="deleteModalLabel">Remove Confirmation</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <p className="text-center">Are you sure you want to permanently remove the {modalDataProp.modelSpec} {modalDataProp.makeSpec} ?</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="button" className="btn btn-danger" id="delete-changes-btn" data-bs-dismiss="modal" onClick={deleteCarBtnHandler}>Proceed to Remove</button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default DeleteModalComponent;
/* 
  => This modal has 2 major JSX items:
    * The deleting message which shows the user the car they want to delete.
    * The proceed to delete button which when clicked calls the deleteCarBtnHandler function that deletes the car from the API.
*/