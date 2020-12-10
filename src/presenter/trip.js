import SiteMenuTemplate from "../view/site-menu.js";
import FilterTemplate from "../view/filter.js";
import TripInfo from "../view/trip-info.js";
import TripCost from "../view/trip-cost.js";
import SortTemplate from "../view/sort.js";
import EventList from "../view/event-list.js";
import EventView from "../view/event.js";
import EventEdit from "../view/event-edit.js";
import EmptyEventList from "../view/list-empty.js";
import {generatePoint} from "../mock/waypoint.js";
import {render, RenderPosition, replace} from "../utils/render.js";


const siteMainElement = document.querySelector(`.page-body`);
const siteHeaderElement = siteMainElement.querySelector(`.trip-main__trip-controls`);
const siteContentEvents = siteMainElement.querySelector(`.trip-events`);
const siteHeaderTrip = siteMainElement.querySelector(`.trip-main__trip-info`);

export default class Trip {
  constructor(tripContainer) {
    this._tripContainer = tripContainer;
    console.log(this._tripContainer);

    this._emptyEventList = new EmptyEventList();
    this._eventList = new EventList();
    this._sortTemplate = new SortTemplate();
  }

  init(tripPoints) {
    this._tripPoints = tripPoints.slice();

    render(siteContentEvents, this._eventList, RenderPosition.BEFOREEND);
    // Метод для инициализации (начала работы) модуля,
    // малая часть текущей функции renderBoard в main.js

    this._renderList();
  }

  _renderSort() {
    render(siteContentEvents, this._sortTemplate, RenderPosition.BEFOREEND);//
  }

  _renderTripInfo() {
    render(siteHeaderTrip, this._tripInfo, RenderPosition.AFTERBEGIN);//
  }

  _renderTripCost() {
    render(siteHeaderTrip, this._tripCost, RenderPosition.AFTERBEGIN);//
  }

  _renderPoint(point) {
    // Метод, куда уйдёт логика созданию и рендерингу компонетов задачи,
    // текущая функция renderTask в main.js

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

    render(this._eventList, eventComponent, RenderPosition.BEFOREEND);
  }

  _renderPoints() {
    this._tripPoints.forEach((point) => this._renderPoint(point));
  }

  _renderNoPoints() {
    // Метод для рендеринга заглушки
    render(siteContentEvents, this._emptyEventList, RenderPosition.BEFOREEND);//
  }

  _renderList() {
    // Метод для инициализации (начала работы) модуля,
    // бОльшая часть текущей функции renderBoard в main.js

    if (this._tripPoints.length === 0) {
      this._renderNoPoints();
      return;
    }

    this._tripCost = new TripCost(this._tripPoints);
    this._renderTripCost();

    this._tripInfo = new TripInfo(this._tripPoints);
    this._renderTripInfo();

    this._renderSort();
    this._renderPoints();
  }
}
