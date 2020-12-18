import dayjs from "dayjs";
import {POINT_TYPES, CITIES} from "../const.js";
import SmartView from "./smart.js";

const createCitiesList = () => {
  return CITIES.map((city) => `<option value="${city}"></option>`).join(``);
};

const createTypesList = () => {
  return POINT_TYPES.map((type) => `
  <div class="event__type-item">
    <input id="event-type-${type.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type.toLowerCase()}">
    <label class="event__type-label  event__type-label--${type.toLowerCase()}" for="event-type-${type.toLowerCase()}-1">${type}</label>
  </div>`).join(``);
};

const createOffers = (offers) => {
  return offers.map(({name, price, isActive}) => {
    return `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${name}" type="checkbox" name="${name}" ${isActive ? `checked` : `` }>
        <label class="event__offer-label" for="event-offer-${name}">
          <span class="event__offer-title">${name}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${price}</span>
        </label>
    </div>`;
  }).join(``);
};

const createEventEdit = (data) => {
  const {type, city, offers, destinations, time, price} = data;

  return `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>
              ${createTypesList()}
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${type}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${city}" list="destination-list-1">
          <datalist id="destination-list-1">
            ${createCitiesList()}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dayjs(time.begin).format(`DD/MM/YY HH:mm`)}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dayjs(time.end).format(`DD/MM/YY HH:mm`)}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>

          <div class="event__available-offers">
           ${createOffers(offers)}
          </div>
        </section>

        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${destinations.description}</p>
        </section>
      </section>
    </form>
  </li>`;
};

export default class EventEdit extends SmartView {
  constructor(point) {
    super();
    this._data = EventEdit.parseTaskToData(point);
    this._editClickHandler = this._editClickHandler.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._priceInputHandler = this._priceInputHandler.bind(this);
    this._cityInputHandler = this._cityInputHandler.bind(this);
    this._typeEventChangeHandler = this._typeEventChangeHandler.bind(this);
    this._offersChangeHandler = this._offersChangeHandler.bind(this);

    this._setInnerHandlers();
  }

  getTemplate() {
    return createEventEdit(this._data);
  }

  reset(point) {
    this.updateData(
        EventEdit.parseTaskToData(point)
    );
  }


  restoreHandlers() {
    this._setInnerHandlers();
    this.setFormSubmitHandler(this._callback.formSubmit);
  }

  _setInnerHandlers() {

    this.getElement()
    .querySelector(`.event__input--price`)
    .addEventListener(`input`, this._priceInputHandler);

    this.getElement()
    .querySelector(`.event__input--destination`)
    .addEventListener(`input`, this._cityInputHandler);

    this.getElement()
    .querySelector(`.event__available-offers`)
    .addEventListener(`change`, this._offersChangeHandler);

    this.getElement()
    .querySelector(`.event__type-group`)
    .addEventListener(`change`, this._typeEventChangeHandler);

    this.getElement()
    .querySelector(`.event__rollup-btn`)
    .addEventListener(`click`, this._editClickHandler);
  }

  _editClickHandler(evt) {
    evt.preventDefault();
    this._callback.editClick();
  }

  setEditClickHandler(callback) {
    this._callback.editClick = callback;
    //this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._editClickHandler);
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(EventEdit.parseDataToTask(this._data));
  }

  _priceInputHandler(evt) {
    evt.preventDefault();
    this.updateData({
      price: evt.target.value
    }, true);
  }

  _cityInputHandler(evt) {
    evt.preventDefault();
    this.updateData({
      city: evt.target.value
    }, true);
  }

  _typeEventChangeHandler(evt) {
    evt.preventDefault();
    this.updateData({
      type: evt.target.value
    });
  }

  _offersChangeHandler(evt) {
    evt.preventDefault();
    let index;

    const newOffers = Object.assign(
        {},
        this._data.offers
    );

    for (let offer of newOffers) {
      if (offer.name.includes(evt.target.name)) {
        index = this._data.offers.indexOf(offer);
      }
    }

    newOffers[index].isActive = !newOffers[index].isActive;

    this.updateData({
      offers: newOffers
    });

  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector(`form`).addEventListener(`submit`, this._formSubmitHandler);
  }

  static parseTaskToData(point) {
    return Object.assign(
        {},
        point
    );
  }

  static parseDataToTask(data) {
    data = Object.assign({}, data);

    return data;
  }
}
