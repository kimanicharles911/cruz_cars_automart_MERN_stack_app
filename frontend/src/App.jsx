import {NavbarComponent, MainComponent, MultipleUpdatesComponent} from './components';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {useState, useEffect} from 'react';

const App = () => {

  const [allCars, setAllCars] = useState([]);
  const [renderAgent, setRenderAgent] = useState(false);

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
  }, [renderAgent])

  return (
    <Router>
      <NavbarComponent renderAgentProp={renderAgent} setRenderAgentProp={setRenderAgent}/>
      <Routes>
        <Route path="/" element={<MainComponent allCarsProp={allCars} setAllCarsProp={setAllCars} renderAgentProp={renderAgent} setRenderAgentProp={setRenderAgent}/>}></Route>
        <Route path="/multipleupdates" element={<MultipleUpdatesComponent allCarsProp={allCars} setAllCarsProp={setAllCars} renderAgentProp={renderAgent} setRenderAgentProp={setRenderAgent}/>}></Route>
      </Routes>
    </Router>
  );
};

export default App;

/* 
  * I first imported the navbar, main and favourites components from the components folder.
  * I then imported the Router, Routes and Route components from react-router-dom.
  * I then imported the useState hook from react.
  * I then changed the App component from using a normal function to an arrow function.
  * I then created a state variable called favourites and setFavourites and set it's default value to an empty array. They will be used to store the user's favourites.
  * I wrapped all components in the Router component.
  * I then added the NavbarComponent.
  * I then created a Routes component and added a Route component for the Main and Favourites components.
  * I then passed the favourites & setFavourites state variables to the NavbarComponent and MainComponent as props.
*/