import './MainComponent.css';
import {AccordionComponent, AllCarsComponent} from './index.js'

const MainComponent = ({ allCarsProp, setAllCarsProp, renderAgentProp, setRenderAgentProp }) => {

  return(
    <main className="container fluid" id="main-container">
      <AccordionComponent/>
      <AllCarsComponent allCarsProp={allCarsProp} setAllCarsProp={setAllCarsProp} renderAgentProp={renderAgentProp} setRenderAgentProp={setRenderAgentProp}/>
    </main>
  )
};
export default MainComponent;