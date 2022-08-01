import React from 'react';

import './selectItem.scss';

export const SelectItem = ({ id, active }: { id: number, active: boolean }) => {
  return (
    <div className={`mouse-select__selectable ${active ? 'active' : ''}`} data-id={id}>
      User #{id}
    </div>
  )
};