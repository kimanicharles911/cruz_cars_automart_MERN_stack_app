// comments for this file are found at the end.
import './MainComponent.css';
import {AccordionComponent, AllCarsComponent} from './index.js'

const MainComponent = ({ allCarsProp, setAllCarsProp, renderAgentProp, setRenderAgentProp }) => {

  return(
    <main className="container fluid" id="main-container">
      <AccordionComponent allCarsProp={allCarsProp} setAllCarsProp={setAllCarsProp}/>
      <AllCarsComponent allCarsProp={allCarsProp} setAllCarsProp={setAllCarsProp} renderAgentProp={renderAgentProp} setRenderAgentProp={setRenderAgentProp}/>
    </main>
  )
};
export default MainComponent;
/* 
  * I imported the styling.
  * I imported the AccordionComponent and AllCarsComponent from the components folder.
  * I created the MainComponent and destructured the allCarsProp, setAllCarsProp, renderAgentProp and setRenderAgentProp passed from the App component.
  * I then wrote the JSX for this component.
  * I then wrapped AccordionComponent and AllCarsComponent in the JSX passing the props needed for thm to operate as expected.
*/