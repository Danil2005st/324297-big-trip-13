export default class Destinations {
  constructor() {
    this._destinations = null;
  }

  setDestinations(destinations) {
    console.log(destinations);
    this._destinations = destinations;
  }

  getDestinations() {
    return this._destinations;
  }
}
