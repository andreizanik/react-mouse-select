import { adjustWindowScroll } from './adjustWindowScroll';
import { CoordinatesAndDimensions } from './types';

// As we examine the mousemove event, we want to adjust the window scroll in
// immediate response to the event; but, we also want to continue adjusting
// the window scroll if the user rests their mouse in the edge boundary. To
// do this, we'll invoke the adjustment logic immediately. Then, we'll setup
// a timer that continues to invoke the adjustment logic while the window can
// still be scrolled in a particular direction.
// --
// NOTE: There are probably better ways to handle the ongoing animation
// check.
export const checkForWindowScroll = (() => {
  let _timer: any = null;

  const _checkForWindowScroll = (coordinatesAndDimensions: CoordinatesAndDimensions) => {
    clearTimeout( _timer );

    if ( adjustWindowScroll(coordinatesAndDimensions) ) {
      _timer = setTimeout( _checkForWindowScroll, 50 );
    }
  }

  return _checkForWindowScroll;
})()