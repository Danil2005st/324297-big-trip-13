import SiteMenuTemplate from "./view/site-menu.js";
import {generatePoint} from "./mock/waypoint.js";
import PointsModel from "./model/points.js";
import FilterModel from "./model/filter.js";
import {render, RenderPosition} from "./utils/render.js";
import TripPresenter from "./presenter/trip.js";
import FilterPresenter from "./presenter/filter.js";
import Api from "./api.js";

const AUTHORIZATION = `Basic Ko9Rl5Ho8Cv8Bc2Jv`;
const END_POINT = `https://13.ecmascript.pages.academy/big-trip`;

const waypoints = new Array(2).fill().map(generatePoint);

console.log(waypoints, 'waypoints');

const api = new Api(END_POINT, AUTHORIZATION);
api.getTasks().then((tasks) => {
  console.log(tasks);
  // Есть проблема: cтруктура объекта похожа, но некоторые ключи называются иначе,
  // а ещё на сервере используется snake_case, а у нас camelCase.
  // Можно, конечно, переписать часть нашего клиентского приложения, но зачем?
  // Есть вариант получше - паттерн "Адаптер"
});


const pointsModel = new PointsModel();
pointsModel.setPoints(waypoints);
const filterModel = new FilterModel();
const siteMainElement = document.querySelector(`.page-body`);
const siteHeaderElement = siteMainElement.querySelector(`.trip-main__trip-controls`);

render(siteHeaderElement, new SiteMenuTemplate(), RenderPosition.AFTERBEGIN);

const tripPresenter = new TripPresenter(siteMainElement, pointsModel, filterModel);
const filterPresenter = new FilterPresenter(siteHeaderElement, filterModel, pointsModel);

filterPresenter.init();
tripPresenter.init();

document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, (evt) => {
  evt.preventDefault();
  tripPresenter.createPoint();
});
