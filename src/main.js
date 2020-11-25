import {createSiteMenuTemplate} from "./view/site-menu.js";
import {createFilterTemplate} from "./view/filter.js";
import {createTripInfo} from "./view/trip-info.js";
import {createTripCost} from "./view/trip-cost.js";
import {createSortTemplate} from "./view/sort.js";
import {createEvent} from "./view/event.js";
import {createEventEdit} from "./view/event-edit.js";
import {createEventAdd} from "./view/event-add.js";
import {createEmptyEventList} from "./view/list-empty.js";
import {generatePoint} from "./mock/waypoint.js";

const waypoints = new Array(5).fill().map(generatePoint);

waypoints.sort(function (a, b) {
  return a.time.begin.valueOf() - b.time.begin.valueOf();
});

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

if (waypoints.length > 0) {

  render(siteHeaderTripWrap, `<section class="trip-main__trip-info  trip-info"></section>`, `afterbegin`);

  const siteHeaderTrip = siteMainElement.querySelector(`.trip-main__trip-info`);

  render(siteHeaderTrip, createTripCost(waypoints), `afterbegin`);
  render(siteHeaderTrip, createTripInfo(waypoints), `afterbegin`);

  render(siteContentEvents, createSortTemplate(), `beforeend`);

  render(siteContentEvents, `<ul class="trip-events__list"></ul>`, `beforeend`);

  const siteContentEventsList = siteMainElement.querySelector(`.trip-events__list`);

  render(siteContentEventsList, createEventEdit(waypoints[0]), `beforeend`);
  render(siteContentEventsList, createEventAdd(waypoints[1]), `beforeend`);

  for (const point of waypoints) {
    render(siteContentEventsList, createEvent(point), `beforeend`);
  }
} else {
  render(siteContentEvents, createEmptyEventList(), `beforeend`);
};
