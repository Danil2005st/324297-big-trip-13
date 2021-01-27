import Abstract from "./abstract.js";
import {MenuItem} from "../const.js";

const createAddNewButtonTemplate = () =>
  `<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">${MenuItem.ADD_NEW_POINT}</button>`
;

export default class AddNewButtonTemplate extends Abstract {
  constructor() {
    super();

    this._menuClickHandler = this._menuClickHandler.bind(this);
  }

  getTemplate() {
    return createAddNewButtonTemplate();
  }

  _menuClickHandler(evt) {
    evt.preventDefault();
    evt.target.disabled = true;
    this._callback.tripPresenter.createPoint(this._callback.callbackPoint);
  }

  setMenuClickHandler(callback, callbackPoint) {
    this._callback.tripPresenter = callback;
    this._callback.callbackPoint = callbackPoint;

    this.getElement().addEventListener(`click`, this._menuClickHandler);
  }
}
