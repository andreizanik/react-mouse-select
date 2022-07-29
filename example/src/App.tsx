import React, { useRef } from 'react';
import { ReactMouseSelect } from 'react-mouse-select';
import './App.css';

function App() {
  const borderSelectionContainer = document.getElementById('portal') as HTMLElement;
  const containerRef = useRef<HTMLElement>(null);

  return (
    <div className="App">
      <main  className="container" ref={containerRef}>
        {[...Array(100)].map((item, idx) => {
          return (
            <div key={idx} className="mouse-select__selectable">
              Test block
            </div>
          )
        })}
      </main>
      <ReactMouseSelect
        containerRef={containerRef}
        portalContainer={borderSelectionContainer}
        onClickPreventDefault={true}
        notStartWithSelectableElements={true}
        startSelectionCallback={() => console.log('startSelectionCallback')}
        finishSelectionCallback={(items: Element[], e: MouseEvent) => {
          console.log('finishSelectionCallback')
          console.log(items);
        }}
      />
    </div>
  );
}

export default App;
