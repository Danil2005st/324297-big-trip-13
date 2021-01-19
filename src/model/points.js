import Observer from "../utils/observer.js";

export default class Points extends Observer {
  constructor() {
    super();
    this._points = [];
    this._offers = {};
    this._destinations = {};
  }

  setPoints(updateType, points, offers, destinations) {
    this._points = points.slice();
    this._offers = offers;
    this._destinations = destinations;
    this._notify(updateType);
  }

  getOffers() {
    return this._offers;
  }

  getDestinations() {
    return this._destinations;
  }

  getPoints() {
    return this._points;
  }

  updateTask(updateType, update) {
    const index = this._points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error(`Can't update unexisting task`);
    }

    this._points = [
      ...this._points.slice(0, index),
      update,
      ...this._points.slice(index + 1)
    ];

    this._notify(updateType, update);
  }

  addTask(updateType, update) {
    this._points = [
      update,
      ...this._points
    ];

    this._notify(updateType, update);
  }

  deleteTask(updateType, update) {
    const index = this._points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error(`Can't delete unexisting task`);
    }

    this._points = [
      ...this._points.slice(0, index),
      ...this._points.slice(index + 1)
    ];

    this._notify(updateType);
  }

  static adaptToClient(task) {
    task.offers.map((offer) => offer.isActive === offer.isActive ? true : false);

    const adaptedTask = Object.assign(
        {},
        task,
        {
          city: {
            city: task.destination.name,
            description: task.destination.description,
            photos: task.destination.pictures
          },
          isFavorite: task.is_favorite,
          price: task.base_price,
          time: {
            begin: new Date(task.date_from),
            end: new Date(task.date_to)
          },
          type: {
            type: task.type,
            offers: task.offers
          }
        }
    );

    delete adaptedTask.base_price;
    delete adaptedTask.destination;
    delete adaptedTask.is_favorite;
    delete adaptedTask.date_from;
    delete adaptedTask.date_to;
    delete adaptedTask.offers;

    return adaptedTask;
  }

  static adaptToServer(task) {

    const adaptedTask = Object.assign(
        {},
        task,
        {
          'destination': {
            'name': task.city.city,
            'description': task.city.description,
            'pictures': task.city.photos
          },
          'is_favorite': task.isFavorite,
          'base_price': Number.parseInt(task.price, 10),
          'date_from': task.time.begin,
          'date_to': task.time.end,
          'type': task.type.type,
          'offers': task.type.offers
        }
    );

    delete adaptedTask.city;
    delete adaptedTask.isFavorite;
    delete adaptedTask.price;
    delete adaptedTask.time;

    return adaptedTask;
  }
}
