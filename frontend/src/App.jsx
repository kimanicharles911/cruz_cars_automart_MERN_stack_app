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
        const response = await fetch('https://cruzcarsapi.cyclic.app/api/v1/cars/car');
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
  * I first imported the navbar, main and MultipleUpdates components from the components folder.
  * I then imported the Router, Routes and Route components from react-router-dom.
  * I then imported the useState and useEffect hook from react.
  * I then created a state variable called allCars and setAllCars and set it's default value to an empty array. They will be used to store all the cars found in the backend API.
  * I then created a state variable called renderAgent and setRenderAgent and set it's default value to false. 
  * The purpose of the renderAgent state is to trigger the useEffect hook in the main component to include the changes made by a user by fetching the API afresh.
  * I used a useEffect hook to fetch data from the backend API when the application starts and when there is a change in the boolean value of the renderAgent.    
  * I then changed the App component from using a normal function to an arrow function.
  * I wrapped all components in the Router component.
  * I then added the NavbarComponent.
  * I then created a Routes component and added a Route component for the Main and MultipleUpdatesComponent components.
  * I then passed the necessary props to the NavbarComponent, MainComponent and MultipleUpdatesComponent that are necessary for them to function as expected.
*/