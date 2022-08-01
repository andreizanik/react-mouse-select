import React from 'react';

import './controlPanel.scss';

interface ControlPanelProps {
  isSelecting: boolean;
  selectedItems: number[]
}

export const ControlPanel = ({ isSelecting, selectedItems }: ControlPanelProps) => {
  return (
    <div className="control-panel">
      <p>Status: {isSelecting ? 'selecting' : ''}</p>
      <p className='control-panel__ids'>
        Selected Ids: {selectedItems.join(', ')}
      </p>
    </div>
  )
}