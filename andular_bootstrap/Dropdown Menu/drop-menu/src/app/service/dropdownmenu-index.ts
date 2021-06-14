import { Injectable } from '@angular/core';
import { KEY_BUTTON } from '../util/keyboard-buttons';
@Injectable({
  providedIn: 'root',
})
export class DropdownAccessiblity {
  activateDDMenu = function (
    menuContainer: string,
    menuBtn: string,
    menuList: string,
    menuItems: string
  ) {
    const styleOpen =
      'position: absolute; top: 0px; left: 0px; will-change: transform; transform: translate(0px, 38px);';
    const styleClose = 'top: 0px; left: 0px; will-change: transform;';
    const STYLE_ATTRIBUTE = 'style';
    const CLASS_SHOW = 'show';
    const ARIA_EXPANDED = 'aria-expanded';
    const KEY_DOWN = 'keydown';

    let currentIndex: number;
    let menuContainerelement: HTMLElement = document.getElementById(
      menuContainer
    ) as HTMLElement;

    let menuButtonElement: HTMLElement = document.getElementById(
      menuBtn
    ) as HTMLElement;
    let menuListElement: HTMLElement = document.getElementById(
      menuList
    ) as HTMLElement;
    let menuItemsElements: HTMLCollectionOf<Element> =
      document.getElementsByClassName(menuItems);

    let firstMenuElement: HTMLElement = menuItemsElements[0] as HTMLElement;
    let lastMenuElement: any = menuItemsElements[
      menuItemsElements.length - 1
    ] as HTMLElement;

    const setElementFocus = (targetedIndex: number) => {
      if (targetedIndex == menuItemsElements.length) {
        targetedIndex = 0;
      } else if (targetedIndex < 0) {
        targetedIndex = menuItemsElements.length - 1;
      }
      (menuItemsElements[targetedIndex] as HTMLElement)?.focus();
      currentIndex = targetedIndex;
    };

    const handleMenuButton = (event: KeyboardEvent): void => {
      switch (event.keyCode) {
        case KEY_BUTTON.UP:
          openMenu();
          lastMenuElement.focus();
          currentIndex = menuItemsElements.length - 1;
          prevent(event);
          break;
        case KEY_BUTTON.DOWN:
        case KEY_BUTTON.SPACE:
        case KEY_BUTTON.RETURN:
          openMenu();
          firstMenuElement.focus();
          currentIndex = 0;
          prevent(event);
          break;
        case KEY_BUTTON.ESC:
          closeMenu();
          prevent(event);
          break;
      }
    };

    const handleMenuListKeydown = (event: KeyboardEvent): void => {
      switch (event.keyCode) {
        case KEY_BUTTON.TAB:
          if (event.shiftKey) {
            if (document.activeElement === firstMenuElement) {
              lastMenuElement.focus();
              prevent(event);
            }
          } else {
            if (document.activeElement === lastMenuElement) {
              firstMenuElement.focus();
              prevent(event);
            }
          }
          break;
        case KEY_BUTTON.DOWN:
          setElementFocus(currentIndex + 1);
          prevent(event);
          break;
        case KEY_BUTTON.UP:
          setElementFocus(currentIndex - 1);
          prevent(event);
          break;
        case KEY_BUTTON.HOME:
          firstMenuElement.focus();
          prevent(event);
          break;
        case KEY_BUTTON.END:
          lastMenuElement.focus();
          prevent(event);
          break;
        case KEY_BUTTON.RETURN:
          (menuItemsElements[currentIndex] as HTMLElement)?.click();
          closeMenu();
          prevent(event);
          break;
        case KEY_BUTTON.ESC:
          closeMenu();
          prevent(event);
          break;
        case KEY_BUTTON.SPACE: // To prevent browser scrol
          prevent(event);
          break;
      }
    };

    const prevent = (event: KeyboardEvent): void => {
      event.preventDefault();
      event.stopPropagation();
      event.cancelBubble = true;
      event.returnValue = false;
    };

    const openMenu = (): void => {
      menuContainerelement.classList.add(CLASS_SHOW);
      menuListElement.classList.add(CLASS_SHOW);
      menuListElement.removeAttribute(STYLE_ATTRIBUTE);
      menuListElement.setAttribute(STYLE_ATTRIBUTE, styleOpen);
      menuButtonElement.setAttribute(ARIA_EXPANDED, 'true');
    };

    const closeMenu = (): void => {
      menuContainerelement.classList.remove(CLASS_SHOW);
      menuListElement.classList.remove(CLASS_SHOW);
      menuListElement.removeAttribute(STYLE_ATTRIBUTE);
      menuListElement.setAttribute(STYLE_ATTRIBUTE, styleClose);
      menuButtonElement.setAttribute(ARIA_EXPANDED, 'false');
      menuButtonElement.focus();
    };

    menuButtonElement.addEventListener(KEY_DOWN, handleMenuButton);
    menuListElement.addEventListener(KEY_DOWN, handleMenuListKeydown);
  };
}
