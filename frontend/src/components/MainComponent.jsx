import './MainComponent.css';
import {useEffect, useState} from 'react';
import {AccordionComponent, AllCarsComponent} from './index.js'

const MainComponent = ({ renderAgentProp, setRenderAgentProp }) => {
  const [allCars, setAllCars] = useState([]);

  useEffect(() => {
    (async () => {
      let dataArr;
      try{
        const response = await fetch('/api/v1/cars/car');
        dataArr = await response.json();
      }catch(err){
        console.error(err);
        dataArr = [];
      }
      setAllCars(dataArr);
    })();
  }, [renderAgentProp])

  return(
    <main className="container fluid" id="main-container">
      <AccordionComponent/>
      <AllCarsComponent allCarsProp={allCars} setAllCarsProp={setAllCars} renderAgentProp={renderAgentProp} setRenderAgentProp={setRenderAgentProp}/>
    </main>
  )
};
export default MainComponent;