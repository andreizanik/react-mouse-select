import { MutableRefObject } from 'react';

export interface MouseSelectProps {
  /**
   * реф контейнера в котором должно работать выделение
   */
  containerRef?: MutableRefObject<HTMLElement | null>;

  /**
   * Kонтейнера для понтала. В него будет рендерится рамка
   */
  portalContainer: HTMLElement;

  /**
   * Чувствительность в пикселях
   * выделение начнет работать, только если курсор был смещен на указанное количество пикилей
   * default = 10
   */
  sensitivity?: number;

  /**
   * Количество пикселей, которое должно быть в рамке, чтобы элемент был выбран.
   * default = 0
   */
  tolerance? : number;

  /**
   * при заверщении выделения, после события onMouseUp, стандартно диспатичится событие onClick
   * если = true, всплытие этого события после выделения предотвращается
   * при обычном клике (без выделения) собырие работает стандартно
   * Пригодится, когда на контейнере есть обработчик клика, который не должен выполняться в случае выделения
   * default = false
   */
  onClickPreventDefault?: boolean;

  /**
   * класс по которому по которому мы находим блоки, которые можно выделять
   * default = mouse-select
   */
  itemClassName?: string

  /**
   * класс который навешивается на элементы которые попадают в выделенную зону
   * default = selected
   */
  activeItemClassName?: string;

  /**
   * Если true, то выделение не будет начинаться с выдеяемых элемнетов, а только с промежутков между ними
   * Может пригодиться, если выдляемые эелменты помимо этого задействованы в drag and drop
   * default = false
   */
  notStartWithSelectableElements?: boolean;

  /**
   * Callback который выполянется во время начала выделения (момент появления рамки)
   */
  startSelectionCallback?: (e: MouseEvent) => void;
  /**
   * Callback который выполянется при завержении выделения
   */
  finishSelectionCallback?: (items: Element[], e: MouseEvent) => void;
  //duringSelectionCallback?: (e: MouseEvent) => void;
}