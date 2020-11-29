import {createElement} from "../utils.js";

const createTripCost = (waypoints) => {
  let totalPrice = 0;
  for (const {price} of waypoints) {
    totalPrice += price;
  }
  return `<p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalPrice}</span>
  </p>`;
};

export default class TripCost {
  constructor(waypoints) {
    this._waypoints = (waypoints);

    this._element = null;
  }

  getTemplate() {
    return createTripCost(this._waypoints);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
