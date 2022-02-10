// comments to this file are found at the bottom of this file.
import './AccordionComponent.css';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const AccordionComponent = ({ setAllCarsProp }) => {

  const [carAge, setCarAge] = useState('');
  const searchBtnHandler = async() => {
    let dataArr;
    try{
      const response = carAge ? await fetch(`/api/v1/cars/search?carAge=${carAge}`) : await fetch(`/api/v1/cars/car`);
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

/* 
  * I first imported the styling.
  * I imported the useState hook from react.
  * I imported the FontAwesomeIcon component, faSearch icons which are all products of the font-awesome library.
  * I then created the AccordionComponent.
  * I then destructured the allCarsProp and setAllCarsProp passed from the MainComponent.
  * I then created the carAge and setCarAge state variables where the carAge input will be stored.
  * I then created the asynchronous searchBtnHandler function which fetches the cars that are of the car age given by the client or returns all cars if the user searches without giving any input. It then stores the cars in the allCarsProp so that they can be rendered in the AllCarsComponent.
  * I then created the ageChangeHandler function that stores the user's car age inout the carAge state variable.
  * I then wrote the JSX for this component which has 6 main components but only 1 the Search by Age input is enabled and function.
*/