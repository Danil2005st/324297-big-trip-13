import {createSiteMenuTemplate} from "./view/site-menu.js";
import {createFilterTemplate} from "./view/filter.js";
import {createTripInfo} from "./view/trip-info.js";
import {createTripCost} from "./view/trip-cost.js";
import {createSortTemplate} from "./view/sort.js";
import {createEvent} from "./view/event.js";
import {createEventEdit} from "./view/event-edit.js";
import {createEventAdd} from "./view/event-add.js";

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector(`.page-body`);
const siteHeaderElement = siteMainElement.querySelector(`.trip-main__trip-controls h2:first-child`);
const siteHeaderElementFilters = siteMainElement.querySelector(`.trip-main__trip-controls`);
const siteHeaderTripWrap = siteMainElement.querySelector(`.trip-main`);
const siteContentEvents = siteMainElement.querySelector(`.trip-events`);

render(siteHeaderElement, createSiteMenuTemplate(), `afterend`);
render(siteHeaderElementFilters, createFilterTemplate(), `beforeend`);
render(siteHeaderTripWrap, `<section class="trip-main__trip-info  trip-info"></section>`, `afterbegin`);

const siteHeaderTrip = siteMainElement.querySelector(`.trip-main__trip-info`);

render(siteHeaderTrip, createTripCost(), `afterbegin`);
render(siteHeaderTrip, createTripInfo(), `afterbegin`);
render(siteContentEvents, createSortTemplate(), `beforeend`);
render(siteContentEvents, `<ul class="trip-events__list"></ul>`, `beforeend`);

const siteContentEventsList = siteMainElement.querySelector(`.trip-events__list`);
render(siteContentEventsList, createEventEdit(), `beforeend`);
render(siteContentEventsList, createEventAdd(), `beforeend`);
render(siteContentEventsList, createEvent(), `beforeend`);
