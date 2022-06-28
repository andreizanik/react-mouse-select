import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import { throttle } from 'lodash';

import { selectionCheck } from './utils/selectionСheck';
import { MouseSelectProps } from './types';

let elements: HTMLCollection;
const defaultPositionState = {
  startX: 0,
  startY: 0,
  x: 0,
  y: 0,
  width: 0,
  height: 0,
};

export const MouseBorderSelect = ({
  containerRef,
  sensitivity = 10,
  tolerance = 0,
  portalContainer,
  onClickPreventDefault = false,
  notStartWithSelectableElements = false,
  itemClassName = 'mouse-select__selectable',
  activeItemClassName = 'selected',
  startSelectionCallback,
  finishSelectionCallback,
}: MouseSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [positions, setPositions] = useState(defaultPositionState);

  const borderRef = useRef<HTMLDivElement | null>(null);
  const myPositionRef = useRef(positions);
  const isOpenRef = useRef(isOpen);

  const handleSelect = throttle((currPositions) => {
    const framePosition = {
      top: currPositions.y,
      bottom: currPositions.y + currPositions.height,
      left: currPositions.x,
      right: currPositions.x + currPositions.width,
    }

    for(let i = 0; i < elements.length; i++) {
      const item = elements[i];

      if (!isOpenRef.current) {
        item.classList.remove(activeItemClassName);
        continue;
      }

      const itemPosition = item.getBoundingClientRect();
      const alreadySelected = item.classList.contains(activeItemClassName);

      const elementPosition = {
        top: itemPosition.top + window.scrollY,
        bottom: itemPosition.bottom + window.scrollY,
        left: itemPosition.left,
        right: itemPosition.right,
      }

      const isSelected = selectionCheck(elementPosition, framePosition, tolerance);

      if (isSelected && !alreadySelected) item.classList.add(activeItemClassName);
      if (!isSelected && alreadySelected) item.classList.remove(activeItemClassName);
    }
  }, 100)

  const handleClick = (e: MouseEvent) => e.stopPropagation();

  const handleMoueMove = (e: MouseEvent) => {
    console.log('handleMoueMove');
    const { pageX, pageY } = e;
    const newState: any = {};

    // условие с координатами надо, что бы при обычном клике не навешивалсоь событие handleClick
    if (!isOpenRef.current
      && (
        myPositionRef.current.startX > pageX + sensitivity
        || myPositionRef.current.startX + sensitivity < pageX
        || myPositionRef.current.startY > pageY + sensitivity
        || myPositionRef.current.startY + sensitivity < pageY
      )) {

      // нужно для того что бы предотвратить распростарние клика и выполенния дургих обработчиков
      if (onClickPreventDefault) {
        window.addEventListener('click', handleClick, { capture: true, once: true });
      }
      if (startSelectionCallback) startSelectionCallback(e);
      setIsOpen(true);
    }

    if (pageX >= myPositionRef.current.startX) {
      newState.width = pageX - myPositionRef.current.startX;
    } else if (pageX < myPositionRef.current.startX) {
      newState.width = myPositionRef.current.startX - pageX;
      newState.x = pageX;
    }

    if (pageY >= myPositionRef.current.startY) {
      newState.height = pageY - myPositionRef.current.startY;
    } else if (pageY < myPositionRef.current.startY) {
      newState.height = myPositionRef.current.startY - pageY;
      newState.y = pageY;
    }

    handleSelect({ ...myPositionRef.current, ...newState });
    setPositions((state) => ({ ...state, ...newState }));
  };

  // ОТПУСКАНИЕ
  const handleMouseUp = (e: MouseEvent) => {
    console.log('handleMouseUp');
    setPositions(defaultPositionState);
    if (containerRef && containerRef?.current) containerRef.current.removeEventListener('mousemove', handleMoueMove);
    else document.removeEventListener('mousemove', handleMoueMove);

    window.removeEventListener('mouseup', handleMouseUp);

    if (borderRef.current) borderRef.current.removeEventListener('mousemove', handleMoueMove);

    let selectedElement: Element[] = [];
    for (let i = 0; i < elements.length; i++) {
      const item = elements[i];

      if (item.classList.contains(activeItemClassName)) {
        console.log('выделенный элемент');
        selectedElement.push(item);
        item.classList.remove(activeItemClassName)
      }
    }

    // Element
    if (finishSelectionCallback) finishSelectionCallback(selectedElement, e);
    //elements = undefined;
    setIsOpen(false);

  };

  // НАЖАТИЕ
  const handleMouseDown = (e: MouseEvent) => {
    console.log('handleMouseDown')
    //  проверяем, что б была нажата только левая кнопка мыши
    if (e.button !== 0) return null;

    let startSelection: boolean = true;
    if (notStartWithSelectableElements) {
      // @ts-ignore
      const elementInitiator = e.composedPath().find((element) => element?.classList?.contains(itemClassName));
      if (elementInitiator) startSelection = false;
    }

    if (startSelection) {
      elements = document.getElementsByClassName(itemClassName);

      setPositions((state) => ({
        ...state,
        startX: e.pageX,
        startY: e.pageY,
        x: e.pageX,
        y: e.pageY,
      }));

      if (containerRef && containerRef.current) containerRef.current.addEventListener('mousemove', handleMoueMove);
      else document.addEventListener('mousemove', handleMoueMove);

      if (borderRef.current) borderRef.current.addEventListener('mousemove', handleMoueMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
  };

  const handleSelectStart = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
  };

  useEffect(() => {
    const element = containerRef?.current;
    const elementBorder = borderRef.current;
    if (element) element.addEventListener('mousedown', handleMouseDown);

    // @ts-ignore
    if (element) {
      element.addEventListener('mousedown', handleMouseDown);
      element.addEventListener('selectstart', handleSelectStart);
    } else {
      document.addEventListener('mousedown', handleMouseDown);
      document.addEventListener('selectstart', handleSelectStart);
    }

    return () => {
      // elements = [];
      if (element) {
        element.removeEventListener('mousedown', handleMouseDown);
        element.removeEventListener('mousemove', handleMoueMove);
        element.removeEventListener('selectstart', handleSelectStart);
      } else  {
        document.removeEventListener('mousedown', handleMouseDown);
        document.removeEventListener('mousemove', handleMoueMove);
        document.removeEventListener('selectstart', handleSelectStart);
      }
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('click', handleClick, { capture: true });

      if (elementBorder) elementBorder.removeEventListener('mousemove', handleMoueMove);
    };
  }, []);

  useEffect(() => {
    myPositionRef.current = positions;
    isOpenRef.current = isOpen;
  }, [positions, isOpen]);

  const renderEl = () => {
    return (
      <div
        className={`mouse-border-select${isOpen ? ' mouse-border-select--open' : ''}`}
        style={{
          top: `${positions.y}px`,
          left: `${positions.x}px`,
          width: `${positions.width}px`,
          height: `${positions.height}px`,
        }}
        ref={borderRef}
      />
    );
  };

  return ReactDOM.createPortal(renderEl(), portalContainer)
};
