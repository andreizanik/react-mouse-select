# Selecting DOM elements by moving the mouse for React

Компонент предназанчен для визуализации выделения DOM элементов  с помощью движения курсора по экрану,
реализацию дальнейшего взаимодействия с выделенными файлами мы оставляем за вам
через callback `finishSelectionCallback`

Кажется что такой подход делает бибилотеку более универсальной,
потому что дальшейнее взаимодействие с выделенными объектами всегда уникально.
В одном случае вам нужно получить id из datasets и обновить redux-store.
В другом случае добавить класс к выледенным элементам и отправить запрос на сервер.
Насколько сложным не был бы ваш кейс, вы сможете реализовать его в `finishSelectionCallback`
имея массив всех выделенных элементов

## DEMO 
![Example](https://andreizanik.github.io/react-mouse-select/example.gif)

[Try it out](https://andreizanik.github.io/react-mouse-select)

## Installation
```
npm install --save react-mouse-select
```

## Usage
```typescript jsx
import { ReactMouseSelect } from 'react-mouse-select';

function App() {
  const borderSelectionContainer = document.getElementById('portal') as HTMLElement;
  const containerRef = useRef<HTMLElement>(null);

  const itemClassName = 'mouse-select__selectable';
  
  return (
    <div className="App">
      <main className="container" ref={containerRef}>
        {[...Array(10)].map((item, idx) => {
          return (
            <div key={idx} className={itemClassName} data-id={idx}>
              Selectable block
            </div>
          )
        })}
      </main>
      <ReactMouseSelect
        containerRef={containerRef}
        portalContainer={borderSelectionContainer}
        itemClassName={itemClassName}
      />
    </div>
  );
}

export default App;
```

_**!!! ОБРАТИТЕ ВНИМАНИЕ**_

Вам самостоятельно нужно позаботиться о том что бы контейнер `containerRef` содержал элементы с классом `itemClassName`,
как это показано в примере выше.

Также вам нужно описать стили для рамки и выделенных элементов,
чтобы выделение было видно визуально

Вы можете стилизовать рамку выделения с помощью классов `frameClassName` и `openFrameClassName`
или же оставить ее невидимой

Стилизовать элементы можно с помощью `itemClassName` и `selectedItemClassName`

Example:
```css
.mouse-select__selectable {
    width: 100px;
    height: 100px;
    margin: 10px;
    background: gray;
}

.mouse-select__selectable .selected {
    border: 2px solid red;
}

.mouse-select__frame {
    background: red;
    opacity: 0.5;
}
```

## Configuration

The `ReactMouseSelect` component accepts a few props:

* `containerRef` [required]:<br/>
  Container ref in which selecting should work


* `portalContainer`  [required]:<br/>
  Portal container in which the highlighting frame will be rendered


* `sensitivity` (number) _default = 10_:<br/>
  Sensitivity in pixels.
  Selection starts working only if the cursor is shifted for the specified number of pixels


* `tolerance` (number) _default = 0_:<br/>
  The number of pixels that must be contained in a frame for the element to be selected


* `onClickPreventDefault` (boolean) _default = false_:<br/>
  When the selection ends, after the onMouseUp event, the onClick event is dispatched by default
  <br/>If = true, the event bubbling is prevented after the selection
  <br/>With a normal click (without selection) the event happens standardly
  <br/>Useful, when there is a click handler on the container, which shouldn’t happen in case of selection


* `itemClassName` (string) _default = 'mouse-select__selectable'_:<br/>
  The class by which it is determined which elements we can select


* `selectedItemClassName` (string) _default = 'selected'_:<br/>
  The class that is added to the elements that come into the selecting frame


* `frameClassName` (string) _default = 'mouse-select__frame'_:<br/>
  Highlighting frame className


* `openFrameClassName` (string) _default = 'open'_:<br/>
  The class that is added to the highlighting frame when it is active


* `notStartWithSelectableElements` (boolean) _default = false_:<br/>
  If true, then the selection will not start with the selected elements, but only with the space between them
  <br/>It can be useful, if the selecting elements, aside from the selection, are involved in drag and drop


* `saveSelectAfterFinish` (boolean) _default = false_:<br/>
  Keep selected Item ClassName on selected items after selection is complete


* `startSelectionCallback` (function `(e: MouseEvent) => void;`):<br/>
  Callback that calls at the start of the selection (when the frame appears)
  
  
* `finishSelectionCallback` (function `(items: Element[], e: MouseEvent) => void;`):<br/>
  Callback that calls at the end of the selection