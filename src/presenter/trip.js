import TripInfo from "../view/trip-info.js";
import TripCost from "../view/trip-cost.js";
import SortTemplate from "../view/sort.js";
import EventList from "../view/event-list.js";
import {sortPointPrice, sortPointTime, sortPointDate} from "../utils/common.js";
import EmptyEventList from "../view/list-empty.js";
import PointPresenter from "./point.js";
import PointNewPresenter from "./point-new.js";
import {render, RenderPosition, remove} from "../utils/render.js";
import {filter} from "../utils/filter.js";
import {FilterType, SortType, UpdateType, UserAction} from "../const.js";


export default class Trip {
  constructor(siteMainElement, pointsModel, filterModel) {
    this._pointsModel = pointsModel;
    this._filterModel = filterModel;
    this._siteMainElement = siteMainElement;
    this._siteContentEvents = this._siteMainElement.querySelector(`.trip-events`);
    this._siteHeaderTrip = this._siteMainElement.querySelector(`.trip-main__trip-info`);

    this._pointPresenter = {};
    this._currentSortType = SortType.DEFAULT;
    this._sortTemplate = null;

    this._emptyEventList = new EmptyEventList();
    this._eventList = new EventList();
   // this._sortTemplate = new SortTemplate();

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    //this._handleTaskChange = this._handleTaskChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._pointsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);

    this._pointNewPresenter = new PointNewPresenter(this._eventList, this._handleViewAction);
  }

  init() {
   /* this._tripPoints = tripPoints.slice();
    this._sourcedTripPoints = tripPoints.slice();*/

    render(this._siteContentEvents, this._eventList, RenderPosition.BEFOREEND);


    this._renderList();
  }

  createPoint() {
    this._currentSortType = SortType.DEFAULT;
    this._filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this._pointNewPresenter.init();
  }

  _getPoints() {
    const filterType = this._filterModel.getFilter();
    const points = this._pointsModel.getPoints();
    const filtredPoints = filter[filterType](points);

    switch (this._currentSortType) {
      case SortType.PRICE:
        return filtredPoints.sort(sortPointPrice);
      case SortType.TIME:
        return filtredPoints.sort(sortPointTime);
    }


    return filtredPoints.sort(sortPointDate);
  }

  /*_handleTaskChange(updatedPoint) {
    this._pointPresenter[updatedPoint.id].init(updatedPoint);
  }*/

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_TASK:
        this._pointsModel.updateTask(updateType, update);
        break;
      case UserAction.ADD_TASK:
        this._pointsModel.addTask(updateType, update);
        break;
      case UserAction.DELETE_TASK:
        this._pointsModel.deleteTask(updateType, update);
        break;
    }
  }
  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        // - обновить часть списка (например, когда поменялось описание)
        this._pointsModel[data.id].init(data);
        break;
      case UpdateType.MINOR:
        this._clearTrip();
        this._renderList();
        break;
      case UpdateType.MAJOR:
        this._clearTrip({resetSortType: true});
        this._renderList();
        break;
    }
  }

  _handleModeChange() {
    this._pointNewPresenter.destroy();

    Object
    .values(this._pointPresenter)
    .forEach((presenter) => presenter.resetView());
  }

  /*_sortTasks(sortType) {
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
  }*/

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

   // this._sortTasks(sortType);
    this._currentSortType = sortType;
    this._clearTrip();
    this._renderList();
  }

  _renderSort() {
    if (this._sortTemplate !== null) {
      this._sortTemplate = null;
    }
    this._sortTemplate = new SortTemplate(this._currentSortType);
    this._sortTemplate.setSortTypeChangeHandler(this._handleSortTypeChange);
    render(this._siteContentEvents, this._sortTemplate, RenderPosition.AFTERBEGIN);
  }

  _renderTripInfo() {
    render(this._siteHeaderTrip, this._tripInfo, RenderPosition.AFTERBEGIN);
  }

  _renderTripCost() {
    render(this._siteHeaderTrip, this._tripCost, RenderPosition.AFTERBEGIN);
  }

  _renderPoint(point) {
    const pointPresenter = new PointPresenter(this._eventList, this._handleViewAction, this._handleModeChange);
    pointPresenter.init(point);
    this._pointPresenter[point.id] = pointPresenter;
  }

  _renderPoints(points) {
    points.forEach((point) => this._renderPoint(point));
  }

  _renderNoPoints() {
    render(this._siteContentEvents, this._emptyEventList, RenderPosition.BEFOREEND);//
  }

  _clearTrip({resetSortType = false} = {}) {
   // const taskCount = this._getTasks().length;

    this._pointNewPresenter.destroy();
    Object
    .values(this._pointPresenter)
    .forEach((presenter) => presenter.destroy());
    this._pointPresenter = {};

    remove(this._sortTemplate);
    remove(this._emptyEventList);
    remove(this._tripCost);
    remove(this._tripInfo);
    //remove(this._loadMoreButtonComponent);

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

  _renderList() {
    const points = this._getPoints();
    const pointsCount = points.length;

    if (pointsCount === 0) {
      this._renderNoPoints();
      return;
    }

    this._tripCost = new TripCost(this._getPoints());
    this._renderTripCost();

    this._tripInfo = new TripInfo(this._getPoints());
    this._renderTripInfo();

    this._renderSort();
    this._renderPoints(this._getPoints());
  }

 /* _clearPointList() {
    Object
    .values(this._pointPresenter)
    .forEach((presenter) => presenter.destroy());
    this._pointPresenter = {};
  }*/
}
