import { ElementPosition } from '../types';

export const selectionCheck = (elementPosition: ElementPosition, framePosition: ElementPosition, tolerance: number) => {
  const aLeftOfB = elementPosition.right - tolerance < framePosition.left;
  const aRightOfB = elementPosition.left + tolerance > framePosition.right;
  const aAboveB = elementPosition.top + tolerance > framePosition.bottom;
  const aBelowB = elementPosition.bottom - tolerance < framePosition.top;

  return !(aLeftOfB || aRightOfB || aAboveB || aBelowB);
};