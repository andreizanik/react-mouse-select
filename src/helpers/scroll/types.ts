export interface CoordinatesAndDimensions {
  viewportX: number,
  viewportY: number,

  edgeSize: number,

  edgeTop: number,
  edgeLeft: number,
  edgeBottom: number,
  edgeRight: number,

  isInLeftEdge: boolean,
  isInRightEdge: boolean,
  isInTopEdge: boolean,
  isInBottomEdge: boolean,

  maxScrollY: number,
  maxScrollX: number,
}