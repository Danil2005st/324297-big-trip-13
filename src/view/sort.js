import {SORTS} from "../const.js";
import Abstract from "./abstract.js";

const createSortList = (currentSortType) => {

  return SORTS.map(({name, isDisabled}) => {
    return `<div class="trip-sort__item  trip-sort__item--${name.toLowerCase()}">
      <input id="sort-${name.toLowerCase()}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${name.toLowerCase()}" ${currentSortType.includes(name.toLowerCase()) ? `checked` : ``} ${isDisabled ? `disabled` : ``}>
      <label class="trip-sort__btn" for="sort-${name.toLowerCase()}">${name}</label>
    </div>`;
  }).join(``);
};

const createSortTemplate = (currentSortType) =>
  `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${createSortList(currentSortType)}
  </form>`;

export default class SortTemplate extends Abstract {
  constructor(currentSortType) {
    super();

    this._currentSortType = currentSortType;

    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createSortTemplate(this._currentSortType);
  }

  _sortTypeChangeHandler(evt) {
    if (evt.target.tagName !== `INPUT`) {
      return;
    }

    this._callback.sortTypeChange(evt.target.value);
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener(`change`, this._sortTypeChangeHandler);
  }
}
