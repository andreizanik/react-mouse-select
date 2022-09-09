import { CoordinatesAndDimensions } from './types';
import { adjustWindowScroll } from './adjustWindowScroll';
import { checkForWindowScroll } from './checkForWindowScroll';

let _timer: any = null;

export const initScroll = (e: MouseEvent, edgeSize: number) => {
  // Read More: https://javascript.info/size-and-scroll-window
  // --
  // The viewport and document dimensions can all be CACHED and then
  // recalculated on window-resize events (for the most part).

  // Get the viewport-relative coordinates of the mousemove event.
  const viewportX = e.clientX;
  const viewportY = e.clientY;

  // Get the viewport dimensions.
  const viewportWidth = document.documentElement.clientWidth;
  const viewportHeight = document.documentElement.clientHeight;

  // to determine if the mouse is within the "edge" of the viewport,
  // which may require scrolling the window. To do this, we need to
  // calculate the boundaries of the edge in the viewport
  const edgeTop = edgeSize;
  const edgeLeft = edgeSize;
  const edgeBottom = ( viewportHeight - edgeSize );
  const edgeRight = ( viewportWidth - edgeSize );

  const isInLeftEdge = ( viewportX < edgeLeft );
  const isInRightEdge = ( viewportX > edgeRight );
  const isInTopEdge = ( viewportY < edgeTop );
  const isInBottomEdge = ( viewportY > edgeBottom );

  // If the mouse is not in the viewport edge, there's no need to calculate
  // anything else.
  if (!( isInLeftEdge || isInRightEdge || isInTopEdge || isInBottomEdge)) {
    clearTimeout( _timer );
    return;
  }

  // If we made it this far, the user's mouse is located within the edge of the
  // viewport. As such, we need to check to see if scrolling needs to be done.

  // Get the document dimensions.
  // --
  // NOTE: The various property reads here are for cross-browser compatibility
  // as outlined in the JavaScript.info site (link provided above).
  const documentWidth = Math.max(
    document.body.scrollWidth,
    document.body.offsetWidth,
    document.body.clientWidth,
    document.documentElement.scrollWidth,
    document.documentElement.offsetWidth,
    document.documentElement.clientWidth
  );
  const documentHeight = Math.max(
    document.body.scrollHeight,
    document.body.offsetHeight,
    document.body.clientHeight,
    document.documentElement.scrollHeight,
    document.documentElement.offsetHeight,
    document.documentElement.clientHeight
  );

  // Calculate the maximum scroll offset in each direction. Since you can only
  // scroll the overflow portion of the document, the maximum represents the
  // length of the document that is NOT in the viewport.
  const maxScrollX = ( documentWidth - viewportWidth );
  const maxScrollY = ( documentHeight - viewportHeight );

  const coordinatesAndDimensions: CoordinatesAndDimensions = {
    maxScrollY,
    maxScrollX,
    isInLeftEdge,
    isInRightEdge,
    isInTopEdge,
    isInBottomEdge,
    edgeLeft,
    edgeRight,
    edgeTop,
    edgeBottom,
    viewportX,
    viewportY,
    edgeSize,
  }
  console.log(coordinatesAndDimensions);
  // checkForWindowScroll(coordinatesAndDimensions)
  (function checkForWindowScroll() {
    clearTimeout( _timer );

    if ( adjustWindowScroll(coordinatesAndDimensions) ) {

      _timer = setTimeout( checkForWindowScroll, 50 );

    }

  })();



}