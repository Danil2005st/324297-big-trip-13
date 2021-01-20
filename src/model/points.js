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

  updatePoint(updateType, update) {
    const index = this._points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error(`Can't update unexisting point`);
    }

    this._points = [
      ...this._points.slice(0, index),
      update,
      ...this._points.slice(index + 1)
    ];

    this._notify(updateType, update);
  }

  addPoint(updateType, update) {
    this._points = [
      update,
      ...this._points
    ];

    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {
    const index = this._points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error(`Can't delete unexisting point`);
    }

    this._points = [
      ...this._points.slice(0, index),
      ...this._points.slice(index + 1)
    ];

    this._notify(updateType);
  }

  static adaptToClient(point) {
    point.offers.map((offer) => offer.isActive === offer.isActive ? true : false);

    const adaptedPoint = Object.assign(
        {},
        point,
        {
          city: {
            city: point.destination.name,
            description: point.destination.description,
            photos: point.destination.pictures
          },
          isFavorite: point.is_favorite,
          price: point.base_price,
          time: {
            begin: new Date(point.date_from),
            end: new Date(point.date_to)
          },
          type: {
            type: point.type,
            offers: point.offers
          }
        }
    );

    delete adaptedPoint.base_price;
    delete adaptedPoint.destination;
    delete adaptedPoint.is_favorite;
    delete adaptedPoint.date_from;
    delete adaptedPoint.date_to;
    delete adaptedPoint.offers;

    return adaptedPoint;
  }

  static adaptToServer(point) {

    const adaptedPoint = Object.assign(
        {},
        point,
        {
          'destination': {
            'name': point.city.city,
            'description': point.city.description,
            'pictures': point.city.photos
          },
          'is_favorite': point.isFavorite,
          'base_price': Number.parseInt(point.price, 10),
          'date_from': point.time.begin,
          'date_to': point.time.end,
          'type': point.type.type,
          'offers': point.type.offers
        }
    );

    delete adaptedPoint.city;
    delete adaptedPoint.isFavorite;
    delete adaptedPoint.price;
    delete adaptedPoint.time;

    return adaptedPoint;
  }
}
