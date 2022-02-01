import './AccordionComponent.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const AccordionComponent = () => {

  return (
    <div className="accordion" id="accordionFlushExample">
      <div className="accordion-item">
        <h2 className="accordion-header" id="flush-headingOne">
          <button className="accordion-button collapsed justify-content-center" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
            Search Filters
          </button>
        </h2>
        <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
          <div className="accordion-body">
            <form>
              <div className="row g-3 align-items-center form-inline">
                <div className="col-auto">
                  <input type="text" className="form-control" placeholder="Search Model" defaultValue="" />
                </div>
                <div className="col-auto">
                  <input type="text" className="form-control" placeholder="Search Make" defaultValue="" />
                </div>
                <div className="col-auto">
                  <input type="text" className="form-control" placeholder="Search Selling Price" defaultValue="" />
                </div>
                <div className="col-auto">
                  <input type="text" className="form-control" placeholder="Search Mileage" defaultValue="" />
                </div>
                <div className="col-auto">
                  <input type="text" className="form-control" placeholder="Search Address" defaultValue="" />
                </div>
                <div className="col-auto">
                  <button type="submit" className="btn" id="filter-btn"><FontAwesomeIcon icon={faSearch} className="font-awesome-icons" id="sync-icon" />&nbsp;Search</button>
                </div>
              </div>
              <hr />
            </form>
          </div>
        </div>
      </div>
    </div>
  )
};
export default AccordionComponent;