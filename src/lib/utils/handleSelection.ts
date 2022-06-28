export const handleSelect = () => {

}

// import { throttle } from 'lodash';
// import { selectionCheck } from './selectionСheck';
//
// export const handleSelect = throttle((currPositions) => {
//   const framePosition = {
//     top: currPositions.y,
//     bottom: currPositions.y + currPositions.height,
//     left: currPositions.x,
//     right: currPositions.x + currPositions.width,
//   }
//
//   for(let i = 0; i < elements.length; i++) {
//     const item = elements[i];
//
//     if (!isOpenRef.current) {
//       item.classList.remove(activeItemClassName);
//       continue;
//     }
//
//     const itemPosition = item.getBoundingClientRect();
//     const alreadySelected = item.classList.contains(activeItemClassName);
//
//     const elementPosition = {
//       top: itemPosition.top + window.scrollY,
//       bottom: itemPosition.bottom + window.scrollY,
//       left: itemPosition.left,
//       right: itemPosition.right,
//     }
//
//     const isSelected = selectionCheck(elementPosition, framePosition, tolerance);
//
//     if (isSelected && !alreadySelected) item.classList.add(activeItemClassName);
//     if (!isSelected && alreadySelected) item.classList.remove(activeItemClassName);
//   }
// }, 100)