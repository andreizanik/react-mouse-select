import { MouseMovePosition } from '../types';

export const mouseMoveCheckToStart = (
  position: MouseMovePosition, pageX: number, pageY: number, sensitivity: number
) => {
  return position.startX > pageX + sensitivity
    || position.startX + sensitivity < pageX
    || position.startY > pageY + sensitivity
    || position.startY + sensitivity < pageY
}