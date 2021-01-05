import SiteMenuTemplate from "./view/site-menu.js";
//import FilterTemplate from "./view/filter.js";
import {generatePoint} from "./mock/waypoint.js";
import PointsModel from "./model/points.js";
import FilterModel from "./model/filter.js";
import {render, RenderPosition} from "./utils/render.js";
import TripPresenter from "./presenter/trip.js";
import FilterPresenter from "./presenter/filter.js";
import {sortPointDate} from "./utils/common.js";

const waypoints = new Array(2).fill().map(generatePoint);
/*
const filters = [
  {
    type: `everything`,
    name: `EVERYTHING`,
    count: 0
  }
];*/

const pointsModel = new PointsModel();
pointsModel.setPoints(waypoints);

const filterModel = new FilterModel();

//waypoints.sort(sortPointDate);

const siteMainElement = document.querySelector(`.page-body`);
const siteHeaderElement = siteMainElement.querySelector(`.trip-main__trip-controls`);

render(siteHeaderElement, new SiteMenuTemplate(), RenderPosition.AFTERBEGIN);
//render(siteHeaderElement, new FilterTemplate(filters, `everything`), RenderPosition.BEFOREEND);

const tripPresenter = new TripPresenter(siteMainElement, pointsModel, filterModel);
const filterPresenter = new FilterPresenter(siteHeaderElement, filterModel, pointsModel);

filterPresenter.init();
tripPresenter.init();

document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, (evt) => {
  evt.preventDefault();
  tripPresenter.createPoint();
});
