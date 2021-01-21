import SiteMenuTemplate from "./view/site-menu.js";
import AddNewButtonTemplate from "./view/add-new-point.js";
import StatisticsView from "./view/statistics.js";
import PointsModel from "./model/points.js";
import FilterModel from "./model/filter.js";
import OffersModel from "./model/offers.js";
import DestinationsModel from "./model/destinations.js";
import {render, RenderPosition} from "./utils/render.js";
import TripPresenter from "./presenter/trip.js";
import FilterPresenter from "./presenter/filter.js";
import Api from "./api.js";
import {MenuItem, UpdateType, FilterType} from "./const.js";

const AUTHORIZATION = `Basic Ko9Rl5Ho8Cv8Bc2`;
const END_POINT = `https://13.ecmascript.pages.academy/big-trip`;
const siteMainElement = document.querySelector(`.page-body`);
const siteHeaderElement = siteMainElement.querySelector(`.trip-main__trip-controls`);

const api = new Api(END_POINT, AUTHORIZATION);
const offersModel = new OffersModel();
const destinationsModel = new DestinationsModel();
const pointsModel = new PointsModel();
const filterModel = new FilterModel();
const siteMenuComponent = new SiteMenuTemplate();
const addNewButtonComponent = new AddNewButtonTemplate();
const tripPresenter = new TripPresenter(siteMainElement, pointsModel, filterModel, api);
const filterPresenter = new FilterPresenter(siteHeaderElement, filterModel, pointsModel);


filterPresenter.init();
tripPresenter.init();

render(siteMainElement, new StatisticsView(pointsModel.getPoints()), RenderPosition.BEFOREEND);

api.getOffers().then((offers) => {
  offersModel.setOffers(offers);
}).catch(() => {
  offersModel.setOffers([]);
});

api.getDestinations().then((destinations) => {
  destinationsModel.setDestinations(destinations);
}).catch(() => {
  destinationsModel.setDestinations([]);
});

api.getPoints()
.then((points) => {
  pointsModel.setPoints(UpdateType.INIT, points, offersModel.getOffers(), destinationsModel.getDestinations());
  render(siteHeaderElement, siteMenuComponent, RenderPosition.AFTERBEGIN);
  render(siteHeaderElement, addNewButtonComponent, RenderPosition.AFTEREND);

  addNewButtonComponent.setMenuClickHandler(tripPresenter, handleTaskNewFormClose);

}).catch(() => {
  pointsModel.setPoints(UpdateType.INIT, []);
  render(siteHeaderElement, siteMenuComponent, RenderPosition.AFTERBEGIN);
  render(siteHeaderElement, addNewButtonComponent, RenderPosition.AFTEREND);

  addNewButtonComponent.setMenuClickHandler(tripPresenter, handleTaskNewFormClose);
});

const handleTaskNewFormClose = () => {
  siteMenuComponent.getElement().querySelector(`[href=${MenuItem.TABLE}]`).disabled = false;
  siteMenuComponent.setMenuItem(MenuItem.TABLE);
};

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.ADD_NEW_POINT:
      console.log('MenuItem.ADD_NEW_POINT')
      // Скрыть статистику
      tripPresenter.destroy();
      filterModel.setFilter(UpdateType.MAJOR, FilterType.ALL);
      tripPresenter.init();
      tripPresenter.createPoint(handleTaskNewFormClose);
      siteMenuComponent.getElement().querySelector(`[href=${MenuItem.TABLE}]`).disabled = true;
      break;
    case MenuItem.TABLE:
      console.log('TABLE')
      tripPresenter.init();
      // Скрыть статистику
      break;
    case MenuItem.STATS:
      console.log('STATS')
      tripPresenter.destroy();
      // Показать статистику
      break;
  }
};

siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);
