import React, { useRef } from 'react';
import { MouseBorderSelect } from './lib/reactMouseSelect';
import './App.css';


function App() {
  const borderSelectionContainer = document.getElementById('portal') as HTMLElement;
  const containerRef = useRef<HTMLElement>(null);

  return (
    <div className="App">
      <div>dadadasda</div>
      <main  className="container" ref={containerRef} onClick={() => console.log('main click!!!')}>
        {[...Array(100)].map((item, idx) => {
          return (
          <div key={idx} className="mouse-select__selectable">
            Test block
          </div>
          )
        })}
      </main>
      <MouseBorderSelect
        containerRef={containerRef}
        portalContainer={borderSelectionContainer}
        onClickPreventDefault={true}
        notStartWithSelectableElements={true}
        startSelectionCallback={() => console.log('startSelectionCallback')}
        finishSelectionCallback={(items, e) => {
          console.log('finishSelectionCallback')
          console.log(items);
        }}
      />
    </div>
  );
}

export default App;
