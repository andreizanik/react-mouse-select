import { throttle } from 'lodash';
import { selectionCheck } from './selectionСheck';
import { ElementPosition, HandleSelectionOptions, MouseMovePosition } from '../types';

export const handleSelection = throttle((
  elements: HTMLCollection, currPositions: MouseMovePosition, options: HandleSelectionOptions
) => {
  const position: ElementPosition = {
    top: currPositions.y,
    bottom: currPositions.y + currPositions.height,
    left: currPositions.x,
    right: currPositions.x + currPositions.width,
  }

  for(let i = 0; i < elements.length; i++) {
    const item = elements[i];

    if (!options.isOpen) {
      item.classList.remove(options.activeItemClassName);
      continue;
    }

    const itemPosition = item.getBoundingClientRect();
    const alreadySelected = item.classList.contains(options.activeItemClassName);

    const elementPosition: ElementPosition = {
      top: itemPosition.top + window.scrollY,
      bottom: itemPosition.bottom + window.scrollY,
      left: itemPosition.left,
      right: itemPosition.right,
    }

    const isSelected = selectionCheck(elementPosition, position, options.tolerance);

    if (isSelected && !alreadySelected) item.classList.add(options.activeItemClassName);
    if (!isSelected && alreadySelected) item.classList.remove(options.activeItemClassName);
  }
}, 100)