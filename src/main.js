import SiteMenuTemplate from "./view/site-menu.js";
import FilterTemplate from "./view/filter.js";
import {generatePoint} from "./mock/waypoint.js";
import {render, RenderPosition} from "./utils/render.js";
import TripPresenter from "./presenter/trip.js";

const waypoints = new Array(20).fill().map(generatePoint);

waypoints.sort(function (a, b) {
  return a.time.begin.valueOf() - b.time.begin.valueOf();
});

const siteMainElement = document.querySelector(`.page-body`);
const siteHeaderElement = siteMainElement.querySelector(`.trip-main__trip-controls`);

render(siteHeaderElement, new SiteMenuTemplate(), RenderPosition.AFTERBEGIN);
render(siteHeaderElement, new FilterTemplate(), RenderPosition.BEFOREEND);
const tripPresenter = new TripPresenter(siteMainElement);

tripPresenter.init(waypoints);
