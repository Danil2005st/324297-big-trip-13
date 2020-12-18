import TripInfo from "../view/trip-info.js";
import TripCost from "../view/trip-cost.js";
import SortTemplate from "../view/sort.js";
import EventList from "../view/event-list.js";
import {updateItem, sortPointPrice, sortPointTime} from "../utils/common.js";
import EmptyEventList from "../view/list-empty.js";
import PointPresenter from "./point.js";
import {render, RenderPosition} from "../utils/render.js";
import {SortType} from "../const.js";

const siteMainElement = document.querySelector(`.page-body`);
const siteContentEvents = siteMainElement.querySelector(`.trip-events`);
const siteHeaderTrip = siteMainElement.querySelector(`.trip-main__trip-info`);

export default class Trip {
  constructor() {
    this._pointPresenter = {};
    this._currentSortType = SortType.DEFAULT;

    this._emptyEventList = new EmptyEventList();
    this._eventList = new EventList();
    this._sortTemplate = new SortTemplate();

    this._handleTaskChange = this._handleTaskChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(tripPoints) {
    this._tripPoints = tripPoints.slice();

    this._sourcedTripPoints = tripPoints.slice();

    render(siteContentEvents, this._eventList, RenderPosition.BEFOREEND);

    this._renderList();
  }

  _handleTaskChange(updatedPoint) {
    console.log(updatedPoint);

    this._tripContainer = updateItem(this._tripPoints, updatedPoint);
    this._pointPresenter[updatedPoint.id].init(updatedPoint);
  }

  _handleModeChange() {
    Object
    .values(this._pointPresenter)
    .forEach((presenter) => presenter.resetView());
  }

  _sortTasks(sortType) {
    switch (sortType) {
      case SortType.PRICE:
        this._tripPoints.sort(sortPointPrice);
        break;
      case SortType.TIME:
        this._tripPoints.sort(sortPointTime);
        break;
      default:
        this._tripPoints = this._sourcedTripPoints.slice();
    }

    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortTasks(sortType);
    this._clearPointList();
    this._renderPoints();
  }

  _renderSort() {
    render(siteContentEvents, this._sortTemplate, RenderPosition.AFTERBEGIN);
    this._sortTemplate.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderTripInfo() {
    render(siteHeaderTrip, this._tripInfo, RenderPosition.AFTERBEGIN);
  }

  _renderTripCost() {
    render(siteHeaderTrip, this._tripCost, RenderPosition.AFTERBEGIN);
  }

  _renderPoint(point) {
    const pointPresenter = new PointPresenter(this._eventList, this._handleTaskChange, this._handleModeChange);
    pointPresenter.init(point);
    this._pointPresenter[point.id] = pointPresenter;
  }

  _renderPoints() {
    this._tripPoints.forEach((point) => this._renderPoint(point));
  }

  _renderNoPoints() {
    render(siteContentEvents, this._emptyEventList, RenderPosition.BEFOREEND);//
  }

  _renderList() {
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

  _clearPointList() {
    Object
    .values(this._pointPresenter)
    .forEach((presenter) => presenter.destroy());
    this._pointPresenter = {};
  }
}
