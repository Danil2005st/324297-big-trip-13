import SiteMenuTemplate from "./view/site-menu.js";
import {UpdateType} from "./const.js";
import PointsModel from "./model/points.js";
import FilterModel from "./model/filter.js";
import OffersModel from "./model/offers.js";
import DestinationsModel from "./model/destinations.js";
import {render, RenderPosition} from "./utils/render.js";
import TripPresenter from "./presenter/trip.js";
import FilterPresenter from "./presenter/filter.js";
import Api from "./api.js";
import EventEdit from "./view/event-edit.js";


const AUTHORIZATION = `Basic Ko9Rl5Ho8Cv8Bc2`;
const END_POINT = `https://13.ecmascript.pages.academy/big-trip`;

//const waypoints = new Array(2).fill().map(generatePoint);

const siteMainElement = document.querySelector(`.page-body`);
const siteHeaderElement = siteMainElement.querySelector(`.trip-main__trip-controls`);
const api = new Api(END_POINT, AUTHORIZATION);

//pointsModel.setPoints(waypoints);

const offersModel = new OffersModel();
const destinationsModel = new DestinationsModel();
const pointsModel = new PointsModel();
const filterModel = new FilterModel();
const siteMenuComponent = new SiteMenuTemplate();


const tripPresenter = new TripPresenter(siteMainElement, pointsModel, filterModel, api);
const filterPresenter = new FilterPresenter(siteHeaderElement, filterModel, pointsModel);

//render(siteHeaderElement, siteMenuComponent, RenderPosition.AFTERBEGIN);
filterPresenter.init();
tripPresenter.init();


api.getOffers().then((offers) => {
  offersModel.setOffers(offers);
}).catch(() => {

});

api.getDestinations().then((destinations) => {
  destinationsModel.setDestinations(destinations);
}).catch(() => {

});

api.getTasks()
.then((tasks) => {
  pointsModel.setPoints(UpdateType.INIT, tasks, offersModel.getOffers(), destinationsModel.getDestinations());
  render(siteHeaderElement, siteMenuComponent, RenderPosition.AFTERBEGIN);
  document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, (evt) => {
    evt.preventDefault();
    tripPresenter.createPoint();
  });

}).catch(() => {
  pointsModel.setPoints(UpdateType.INIT, []);
  render(siteHeaderElement, siteMenuComponent, RenderPosition.AFTERBEGIN);
  document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, (evt) => {
    evt.preventDefault();
    tripPresenter.createPoint();
  });
});


