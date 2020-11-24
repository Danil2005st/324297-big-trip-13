import {FILTERS} from "../const.js";

const createFilterList = () => {
  return FILTERS.map(({name, isActive}) => {
    return `<div class="trip-filters__filter">
      <input id="filter-${name.toLowerCase()}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${name.toLowerCase()}"  ${isActive ? `checked` : ``}>
      <label class="trip-filters__filter-label" for="filter-${name.toLowerCase()}">${name}</label>
    </div>`;
  }).join(``);
};

export const createFilterTemplate = () =>
  `<form class="trip-filters" action="#" method="get">
    ${createFilterList()}
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`
;
