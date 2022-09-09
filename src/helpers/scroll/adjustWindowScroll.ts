import { CoordinatesAndDimensions } from './types';
// Adjust the window scroll based on the user's mouse position. Returns True
// or False depending on whether or not the window scroll was changed.
export const adjustWindowScroll = (data: CoordinatesAndDimensions) => {
  // Get the current scroll position of the document.
  const currentScrollX = window.pageXOffset;
  const currentScrollY = window.pageYOffset;
  console.log(data);
  // Determine if the window can be scrolled in any particular direction.
  const canScrollUp = ( currentScrollY > 0 );
  const canScrollDown = ( currentScrollY < data.maxScrollY );
  const canScrollLeft = ( currentScrollX > 0 );
  const canScrollRight = ( currentScrollX < data.maxScrollX );

  // Since we can potentially scroll in two directions at the same time,
  // let's keep track of the next scroll, starting with the current scroll.
  let nextScrollX = currentScrollX;
  let nextScrollY = currentScrollY;

  // As we examine the mouse position within the edge, we want to make the
  // incremental scroll changes more "intense" the closer that the user
  // gets the viewport edge. As such, we'll calculate the percentage that
  // the user has made it "through the edge" when calculating the delta.
  // Then, that use that percentage to back-off from the "max" step value.
  const maxStep = 30;

  // Should we scroll left or right?
  if (data.isInLeftEdge && canScrollLeft) {
    const intensity = ((data.edgeLeft - data.viewportX) / data.edgeSize);
    nextScrollX = (nextScrollX - (maxStep * intensity));
  } else if (data.isInRightEdge && canScrollRight) {
    const intensity = ((data.viewportX - data.edgeRight) / data.edgeSize);
    nextScrollX = (nextScrollX + (maxStep * intensity));
  }

  // Should we scroll up or down?
  if (data.isInTopEdge && canScrollUp) {
    const intensity = ((data.edgeTop - data.viewportY) / data.edgeSize);
    nextScrollY = (nextScrollY - (maxStep * intensity));
  } else if (data.isInBottomEdge && canScrollDown) {
    const intensity = ((data.viewportY - data.edgeBottom) / data.edgeSize);
    nextScrollY = (nextScrollY + (maxStep * intensity));
  }

  // Sanitize invalid maximums. An invalid scroll offset won't break the
  // subsequent .scrollTo() call; however, it will make it harder to
  // determine if the .scrollTo() method should have been called in the
  // first place.
  nextScrollX = Math.max( 0, Math.min(data.maxScrollX, nextScrollX));
  nextScrollY = Math.max( 0, Math.min(data.maxScrollY, nextScrollY));
  if (nextScrollX !== currentScrollX || nextScrollY !== currentScrollY) {
    window.scrollTo( nextScrollX, nextScrollY );
    return true;
  } else {
    return false;
  }
}