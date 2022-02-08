import './AccordionComponent.css';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const AccordionComponent = ({ allCarsProp, setAllCarsProp }) => {

  const [carAge, setCarAge] = useState('');
  const searchBtnHandler = async() => {
    let dataArr;
    try{
      const response = carAge ? await fetch(`/api/v1/cars/search?carAge=${carAge}`) : await fetch(`/api/v1/cars/car`);
      console.log(`😜searched`);
      dataArr = await response.json();
    }catch(err){
      console.error(err);
      dataArr = [];
    }
    setAllCarsProp(dataArr);
  };

  const ageChangeHandler = (event) => {
    setCarAge(event.target.value);
  };

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
                  <input type="text" className="form-control" placeholder="Search by Age" value={carAge} onChange={ageChangeHandler}/>
                </div>
                <div className="col-auto">
                  <input type="text" className="form-control" placeholder="Search Model" disabled/>
                </div>
                <div className="col-auto">
                  <input type="text" className="form-control" placeholder="Search Make" disabled/>
                </div>
                <div className="col-auto">
                  <input type="text" className="form-control" placeholder="Search Selling Price" disabled/>
                </div>
                <div className="col-auto">
                  <input type="text" className="form-control" placeholder="Search Mileage" disabled/>
                </div>
                <div className="col-auto">
                  <input type="text" className="form-control" placeholder="Search Address" disabled/>
                </div>
                <div className="col-auto">
                  <button type="button" className="btn" id="filter-btn" onClick={searchBtnHandler}><FontAwesomeIcon icon={faSearch} className="font-awesome-icons" id="sync-icon" />&nbsp;Search</button>
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