import SiteMenuTemplate from "./view/site-menu.js";
import FilterTemplate from "./view/filter.js";
import TripInfo from "./view/trip-info.js";
import TripCost from "./view/trip-cost.js";
import SortTemplate from "./view/sort.js";
import EventList from "./view/event-list.js";
import EventView from "./view/event.js";
import EventEdit from "./view/event-edit.js";
//import {createEventAdd} from "./view/event-add.js";
import EmptyEventList from "./view/list-empty.js";
import {generatePoint} from "./mock/waypoint.js";
import {render, RenderPosition, replace} from "./utils.js";

const waypoints = new Array(20).fill().map(generatePoint);

waypoints.sort(function (a, b) {
  return a.time.begin.valueOf() - b.time.begin.valueOf();
});


const siteMainElement = document.querySelector(`.page-body`);
const siteHeaderElement = siteMainElement.querySelector(`.trip-main__trip-controls`);
const siteContentEvents = siteMainElement.querySelector(`.trip-events`);

render(siteHeaderElement, new SiteMenuTemplate(), RenderPosition.AFTERBEGIN);
render(siteHeaderElement, new FilterTemplate(), RenderPosition.BEFOREEND);

const renderTask = (eventListComponent, point) => {

  const eventComponent = new EventView(point);
  const eventEditComponent = new EventEdit(point);

  const replaceCardToForm = () => {
    replace(eventEditComponent, eventComponent);
  };

  const replaceFormToCard = () => {
    replace(eventComponent, eventEditComponent);
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      replaceFormToCard();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  eventComponent.setEditClickHandler(() => {
    replaceCardToForm();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  eventEditComponent.setFormSubmitHandler(() => {
    replaceFormToCard();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  eventEditComponent.setEditClickHandler(() => {
    replaceFormToCard();
  });

  render(eventListComponent, eventComponent, RenderPosition.BEFOREEND);
};

const renderEventList = (listContainer, waypointList) => {
  if (waypointList.length === 0) {
    render(siteContentEvents, new EmptyEventList(), RenderPosition.BEFOREEND);
    return;
  }

  const eventListComponent = new EventList();
  const siteHeaderTrip = siteMainElement.querySelector(`.trip-main__trip-info`);
  render(siteHeaderTrip, new TripCost(waypointList), RenderPosition.AFTERBEGIN);
  render(siteHeaderTrip, new TripInfo(waypointList), RenderPosition.AFTERBEGIN);
  render(siteContentEvents, new SortTemplate(), RenderPosition.BEFOREEND);
  render(siteContentEvents, eventListComponent, RenderPosition.BEFOREEND);

  waypointList.forEach((point) => renderTask(eventListComponent, point));
};

renderEventList(siteMainElement, waypoints);
