import SiteMenuTemplate from "./view/site-menu.js";
import FilterTemplate from "./view/filter.js";
import TripInfo from "./view/trip-info.js";
import TripCost from "./view/trip-cost.js";
import SortTemplate from "./view/sort.js";
import EventList from "./view/event-list.js";
import Event from "./view/event.js";
import EventEdit from "./view/event-edit.js";
import EmptyEventList from "./view/list-empty.js";
import {generatePoint} from "./mock/waypoint.js";
import {render, RenderPosition} from "./utils.js";

const waypoints = new Array(20).fill().map(generatePoint);

waypoints.sort(function (a, b) {
  return a.time.begin.valueOf() - b.time.begin.valueOf();
});


const siteMainElement = document.querySelector(`.page-body`);
const siteHeaderElement = siteMainElement.querySelector(`.trip-main__trip-controls`);
const siteContentEvents = siteMainElement.querySelector(`.trip-events`);

render(siteHeaderElement, new SiteMenuTemplate().getElement(), RenderPosition.AFTERBEGIN);
render(siteHeaderElement, new FilterTemplate().getElement(), RenderPosition.BEFOREEND);

const renderTask = (eventListComponent, point) => {

  const eventComponent = new Event(point);
  const eventEditComponent = new EventEdit(point);

  const replaceCardToForm = () => {
    eventListComponent.replaceChild(eventEditComponent.getElement(), eventComponent.getElement());
  };

  const replaceFormToCard = () => {
    eventListComponent.replaceChild(eventComponent.getElement(), eventEditComponent.getElement());
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      replaceFormToCard();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  eventComponent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
    replaceCardToForm();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  eventEditComponent.getElement().querySelector(`form`).addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    replaceFormToCard();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(eventListComponent, eventComponent.getElement(), RenderPosition.BEFOREEND);
};

const renderEventList = (listContainer, waypointList) => {
  if (waypointList.length === 0) {
    render(siteContentEvents, new EmptyEventList().getElement(), RenderPosition.BEFOREEND);
    return;
  }

  const eventListComponent = new EventList();
  const siteHeaderTrip = siteMainElement.querySelector(`.trip-main__trip-info`);
  render(siteHeaderTrip, new TripCost(waypointList).getElement(), RenderPosition.AFTERBEGIN);
  render(siteHeaderTrip, new TripInfo(waypointList).getElement(), RenderPosition.AFTERBEGIN);
  render(siteContentEvents, new SortTemplate().getElement(), RenderPosition.BEFOREEND);
  render(siteContentEvents, eventListComponent.getElement(), RenderPosition.BEFOREEND);

  waypointList.forEach((point) => renderTask(eventListComponent.getElement(), point));
};

renderEventList(siteMainElement, waypoints);
