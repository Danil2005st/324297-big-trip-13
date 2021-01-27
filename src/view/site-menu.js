import Abstract from "./abstract.js";
import {MenuItem} from "../const.js";

const createSiteMenuTemplate = () =>
  `<nav class="trip-controls__trip-tabs trip-tabs">
    <a class="trip-tabs__btn  trip-tabs__btn--active" href="${MenuItem.TABLE}">${MenuItem.TABLE}</a>
    <a class="trip-tabs__btn" href="${MenuItem.STATS}">${MenuItem.STATS}</a>
  </nav>`
;

export default class SiteMenuTemplate extends Abstract {
  constructor() {
    super();

    this._menuClickHandler = this._menuClickHandler.bind(this);
  }

  getTemplate() {
    return createSiteMenuTemplate();
  }

  _menuClickHandler(evt) {
    evt.preventDefault();
    this._callback.menuClick(evt.target.innerText);
  }

  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;
    this.getElement().addEventListener(`click`, this._menuClickHandler);
  }

  setMenuItem(menuItem, newButton) {
    const items = this.getElement().querySelectorAll(`a`);
    const item = this.getElement().querySelector(`[href=${menuItem}]`);

    items.forEach(() => item.classList.remove(`trip-tabs__btn--active`));

    if (item !== null) {
      item.classList.add(`trip-tabs__btn--active`);
    }

    newButton.disabled = menuItem === MenuItem.STATS;
  }
}
