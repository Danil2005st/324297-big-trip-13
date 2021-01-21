import TripInfo from "../view/trip-info.js";
import TripCost from "../view/trip-cost.js";
import SortTemplate from "../view/sort.js";
import EventList from "../view/event-list.js";
import LoadingView from "../view/loading.js";
import {sortPointPrice, sortPointTime, sortPointDate} from "../utils/common.js";
import EmptyEventList from "../view/list-empty.js";
import PointPresenter, {State as PointPresenterViewState} from "./point.js";
import PointNewPresenter from "./point-new.js";
import {render, RenderPosition, remove} from "../utils/render.js";
import {filter} from "../utils/filter.js";
import {SortType, UpdateType, UserAction} from "../const.js";

export default class Trip {
  constructor(siteMainElement, pointsModel, filterModel, api) {
    this._pointsModel = pointsModel;
    this._filterModel = filterModel;
    this._siteMainElement = siteMainElement;
    this._siteContentEvents = this._siteMainElement.querySelector(`.trip-events`);
    this._siteHeaderTrip = this._siteMainElement.querySelector(`.trip-main__trip-info`);
    this._pointPresenter = {};
    this._currentSortType = SortType.DEFAULT;
    this._isLoading = true;
    this._api = api;
    this._sortTemplate = null;
    this._emptyEventList = new EmptyEventList();
    this._eventList = new EventList();
    this._loadingComponent = new LoadingView();

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._pointNewPresenter = new PointNewPresenter(this._eventList, this._handleViewAction);
  }

  init() {
    render(this._siteContentEvents, this._eventList, RenderPosition.BEFOREEND);

    this._pointsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);

    this._renderList();
  }

  destroy() {
    this._clearTrip({resetRenderedTaskCount: true, resetSortType: true});

   // remove(this._taskListComponent);
    remove(this._eventList);

    this._pointsModel.removeObserver(this._handleModelEvent);
    this._filterModel.removeObserver(this._handleModelEvent);
  }

  createPoint(callback) {
    this._pointNewPresenter.init(this._pointsModel.getOffers(), this._pointsModel.getDestinations(), callback);
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

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this._pointPresenter[update.id].setViewState(PointPresenterViewState.SAVING);
        this._api.updatePoint(update)
        .then((response) => {
          this._pointsModel.updatePoint(updateType, response);
        })
        .catch(() => {
          this._pointPresenter[update.id].setViewState(PointPresenterViewState.ABORTING);
        });
        break;
      case UserAction.ADD_POINT:
        this._pointNewPresenter.setSaving();
        this._api.addPoint(update)
        .then((response) => {
          this._pointsModel.addPoint(updateType, response);
        }).catch(() => {
          this._pointNewPresenter.setAborting();
        });
        break;
      case UserAction.DELETE_POINT:
        this._pointPresenter[update.id].setViewState(PointPresenterViewState.DELETING);
        this._api.deletePoint(update)
        .then(() => {
          this._pointsModel.deletePoint(updateType, update);
        })
        .catch(() => {
          this._pointPresenter[update.id].setViewState(PointPresenterViewState.ABORTING);
        });
        break;
    }
  }
  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
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
      case UpdateType.INIT:
        this._isLoading = false;
        remove(this._loadingComponent);
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

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

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
    pointPresenter.init(point, this._pointsModel.getOffers(), this._pointsModel.getDestinations());
    this._pointPresenter[point.id] = pointPresenter;
  }

  _renderPoints(points) {
    points.forEach((point) => this._renderPoint(point));
  }

  _renderLoading() {
    render(this._eventList, this._loadingComponent, RenderPosition.AFTERBEGIN);
  }

  _renderNoPoints() {
    render(this._siteContentEvents, this._emptyEventList, RenderPosition.BEFOREEND);//
  }

  _clearTrip({resetSortType = false} = {}) {
    this._pointNewPresenter.destroy();

    Object
    .values(this._pointPresenter)
    .forEach((presenter) => presenter.destroy());
    this._pointPresenter = {};

    remove(this._sortTemplate);
    remove(this._emptyEventList);
    remove(this._tripCost);
    remove(this._tripInfo);
    remove(this._loadingComponent);

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

  _renderList() {
    if (this._isLoading) {
      this._renderLoading();
      return;
    }

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
}
