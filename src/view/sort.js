import {SORTS} from "../const.js";
import Abstract from "./abstract.js";

const createSortList = () => {
  return SORTS.map(({name, isActive, isDisabled}) => {
    return `<div class="trip-sort__item  trip-sort__item--${name.toLowerCase()}">
      <input id="sort-${name.toLowerCase()}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${name.toLowerCase()}" ${isActive ? `checked` : ``} ${isDisabled ? `disabled` : ``}>
      <label class="trip-sort__btn" for="sort-${name.toLowerCase()}">${name}</label>
    </div>`;
  }).join(``);
};

const createSortTemplate = () =>
  `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${createSortList()}
  </form>`
;

export default class SortTemplate extends Abstract {
  getTemplate() {
    return createSortTemplate();
  }
}
