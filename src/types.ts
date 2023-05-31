import { MutableRefObject } from 'react';

export type TFinishSelectionCallback = (items: Element[], e: MouseEvent) => void;
export type TStartSelectionCallback = (e: MouseEvent) => void;

export interface ReactMouseSelectProps {
  /**
   * Container ref in which selecting should work
   */
  containerRef?: MutableRefObject<HTMLElement | null>;

  /**
   * Portal container in which the highlighting frame will be rendered
   */
  portalContainer?: HTMLElement;

  /**
   * Sensitivity in pixels
   * Selection starts working only if the cursor is shifted for the specified number of pixels
   * default = 10
   */
  sensitivity?: number;

  /**
   * The number of pixels that must be contained in a frame for the element to be selected
   * default = 0
   */
  tolerance? : number;

  /**
   * The size of the edge of the viewport.
   * The scroll starts automatically when the cursor enters the borders of this edge
   * If equal 0, scrolling will not work
   * edgeSize = 100
   */
  edgeSize? : number;

  /**
   * When the selection ends, after the onMouseUp event, the onClick event is dispatched by default
   * If = true, the event bubbling is prevented after the selection
   * With a normal click (without selection) the event happens standardly
   * Useful, when there is a click handler on the container, which shouldn’t happen in case of selection
   * default = false
   */
  onClickPreventDefault?: boolean;

  /**
   * The class by which it is determined which elements we can select
   * default = mouse-select__selectable
   */
  itemClassName?: string

  /**
   * The class that is added to the elements that come into the selecting frame
   * default = selected
   */
  selectedItemClassName?: string;

  /**
   * Highlighting frame className
   * default = mouse-select__frame
   */
  frameClassName?: string

  /**
   * The class that is added to the highlighting frame when it is active
   * default = mouse-select__frame--open
   */
  openFrameClassName?: string

  /**
   *
   * If true, then the selection will not start with the selected elements, but only with the space between them
   * It can be useful, if the selecting elements, aside from the selection, are involved in drag and drop
   * default = false
   */
  notStartWithSelectableElements?: boolean;

  /**
   * Keep selected Item ClassName on selected items after selection is complete
   * default = false
   */
  saveSelectAfterFinish?: boolean

  /**
   * Callback that calls at the start of the selection (when the frame appears)
   */
  startSelectionCallback?: TStartSelectionCallback;

  /**
   * Callback that calls at the end of the selection
   */
  finishSelectionCallback?: TFinishSelectionCallback;
}

export interface HandleSelectionOptions {
  selectedItemClassName: string;
  tolerance: number;
  saveSelectAfterFinish: boolean;
  isOpenRef: MutableRefObject<boolean>;
}

export interface MouseMovePosition {
  startX: number;
  startY: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface ElementPosition {
  top: number;
  bottom: number;
  left: number;
  right: number;
}
