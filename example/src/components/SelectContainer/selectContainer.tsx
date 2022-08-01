import React, { useRef, useState } from 'react';
import { ReactMouseSelect, TFinishSelectionCallback } from 'react-mouse-select';
import { ControlPanel } from '../ControlPanel';
import { SelectItem } from '../SelectItem';

import './selectContainer.scss';

export const SelectContainer = () => {
  const borderSelectionContainer = document.getElementById('portal') as HTMLElement;
  const containerRef = useRef<HTMLElement>(null);

  const [isSelecting, setIsSelecting] = useState(false);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const handleStartSelection = () => {
    setIsSelecting(true);
    setSelectedItems([]);
  }
  const finishSelection: TFinishSelectionCallback = (items, e) => {
    setIsSelecting(false);
    const selectedIds = items.map(item => parseInt(item.getAttribute('data-id') || ''));
    setSelectedItems(selectedIds);
  }

  return (
    <div className="main-box">
      <div className="sidebar">
        <ControlPanel isSelecting={isSelecting} selectedItems={selectedItems} />
      </div>
      <main  className="container" ref={containerRef}>
        {[...Array(30)].map((item, idx) => (
          <SelectItem key={idx} id={idx} active={selectedItems.includes(idx)} />
        ))}
      </main>
      <ReactMouseSelect
        containerRef={containerRef}
        portalContainer={borderSelectionContainer}
        itemClassName="mouse-select__selectable"
        sensitivity={10}
        tolerance={5}
        notStartWithSelectableElements={false}
        startSelectionCallback={handleStartSelection}
        finishSelectionCallback={finishSelection}
      />
    </div>
  )
};

