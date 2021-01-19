import dayjs from "dayjs";
import {generateId} from "../utils/common.js";
import SmartView from "./smart.js";
import flatpickr from "flatpickr";
import "../../node_modules/flatpickr/dist/flatpickr.min.css";

const BLANK_POINT = {
  id: generateId(),
  type: {
    type: `Taxi`,
    offers: []
  },
  city: {
    city: ``,
    description: ``,
    photos: []
  },
  time: {
    begin: dayjs(),
    end: dayjs(),
    difference: ``
  },
  price: ``,
  isFavorite: false,
};

const createCitiesList = (destinations) => {
  return destinations.map((destination) => `<option value="${destination.name}"></option>`).join(``);
};

const createPhotoList = (photos) => {
  return photos.map((photo) => `<img class="event__photo" src="${photo.src}" alt="${photo.description}">`).join(``);
};

const createTypesList = (offers) => {
  return offers.map((offer) => `
  <div class="event__type-item">
    <input id="event-type-${offer.type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${offer.type}">
    <label class="event__type-label  event__type-label--${offer.type}" for="event-type-${offer.type}-1">${offer.type}</label>
  </div>`).join(``);
};

const createOffers = (offers) => {
  return offers.map(({title, price, isActive}) => {
    return `<div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${title}" type="checkbox" name="${title}" ${isActive ? `checked` : ``}>
      <label class="event__offer-label" for="event-offer-${title}">
        <span class="event__offer-title">${title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${price}</span>
      </label>
  </div>`;
  }).join(``);
};

const createEventEdit = (data, newOffers, newDestinations) => {
  const {type, city, time, price} = data;

  const tripEvent = `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type.type.toLowerCase()}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>
              ${createTypesList(newOffers)}
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${type.type}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${city.city}" list="destination-list-1">
          <datalist id="destination-list-1">
            ${createCitiesList(newDestinations)}
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
        <section class="event__section  event__section--offers ${type.offers.length > 0 ? `` : `visually-hidden`}">

          <h3 class="event__section-title  event__section-title--offers">Offers</h3>

          <div class="event__available-offers">
           ${createOffers(type.offers)}
          </div>
        </section>

        <section class="event__section  event__section--destination ${city.description ? `` : `visually-hidden`}">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${city.description}</p>

          <div class="event__photos-container">
            <div class="event__photos-tape">
              ${createPhotoList(city.photos)}
            </div>
          </div>
        </section>
      </section>
    </form>
  </li>`;

  return tripEvent;
};

export default class EventEdit extends SmartView {
  constructor(point = BLANK_POINT, offers = [], destinations = []) {
    super();
    this._point = JSON.parse(JSON.stringify(point));
    this._datepickerEnd = null;
    this._datepickerStart = null;
    this._updateDifferent = this._point.time.difference;
    this._data = JSON.parse(JSON.stringify(EventEdit.parseTaskToData(point)));
    this._offers = JSON.parse(JSON.stringify(offers));
    this._destinations = JSON.parse(JSON.stringify(destinations));

    this._editClickHandler = this._editClickHandler.bind(this);
    this._formDeleteClickHandler = this._formDeleteClickHandler.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._priceInputHandler = this._priceInputHandler.bind(this);
    this._cityInputHandler = this._cityInputHandler.bind(this);
    this._validateCity = this._validateCity.bind(this);
    this._typeEventChangeHandler = this._typeEventChangeHandler.bind(this);
    this._offersChangeHandler = this._offersChangeHandler.bind(this);
    this._startDateChangeHandler = this._startDateChangeHandler.bind(this);
    this._endDateChangeHandler = this._endDateChangeHandler.bind(this);
    this._setInputFilter = this._setInputFilter.bind(this);

    this._setInnerHandlers();
    this._setDatepicker();
  }

  getTemplate() {
    return createEventEdit(this._data, this._offers, this._destinations);
  }

  removeElement() {
    super.removeElement();

    if (this._datepickerStart) {
      this._datepickerStart.destroy();
      this._datepickerStart = null;
    }
    if (this._datepickerEnd) {
      this._datepickerEnd.destroy();
      this._datepickerEnd = null;
    }
  }

  reset(point) {
    this.updateData(
        EventEdit.parseTaskToData(point)
        , false);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this._setDatepicker();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setDeleteClickHandler(this._callback.deleteClick);
  }

  _calculateDifferenceTime(begin, end) {
    const days = end.diff(begin, `day`);
    const hours = end.diff(begin, `hour`) % 24;
    const minutes = end.diff(begin, `minute`) % 60;

    if (days > 0) {
      this._updateDifferent = `${days}D ${hours}H ${minutes}M`;
    } else if (hours > 0) {
      this._updateDifferent = `${hours}H ${minutes}M`;
    } else {
      this._updateDifferent = `${minutes}M`;
    }
  }

  _setDatepicker() {
    if (this._datepickerStart) {
      this._datepickerStart.destroy();
      this._datepickerStart = null;
    }

    if (this._datepickerEnd) {
      this._datepickerEnd.destroy();
      this._datepickerEnd = null;
    }

    this._datepickerStart = flatpickr(
        this.getElement().querySelector(`#event-start-time-1`),
        {
          enableTime: true,
          dateFormat: `d/m/y H:i`,
          defaultDate: this._data.time.begin,
          onChange: this._startDateChangeHandler
        }
    );

    this._datepickerEnd = flatpickr(
        this.getElement().querySelector(`#event-end-time-1`),
        {
          enableTime: true,
          dateFormat: `d/m/y H:i`,
          defaultDate: this._data.time.end,
          onChange: this._endDateChangeHandler,
          minDate: dayjs(this._data.time.begin).toDate()
        }
    );
  }

  _setInnerHandlers() {
    this.getElement()
    .querySelector(`.event__input--price`)
    .addEventListener(`input`, this._priceInputHandler);

    this.getElement()
    .querySelector(`.event__input--price`)
    .addEventListener(`input`, this._setInputFilter);

    this.getElement()
    .querySelector(`.event__input--destination`)
    .addEventListener(`focus`, this._validateCity);

    this.getElement()
    .querySelector(`.event__input--destination`)
    .addEventListener(`keydown`, this._validateCity);

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

  _validateCity(event) {
    event.target.value = ``;
  }

  _startDateChangeHandler([userDate]) {
    const newTime = Object.assign(
        {},
        {
          begin: dayjs(userDate),
          end: dayjs(this._data.time.end),
          difference: this._data.time.difference,
        }
    );

    this.updateData({
      time: newTime
    }, true);

    this._datepickerEnd = flatpickr(
        this.getElement().querySelector(`#event-end-time-1`),
        {
          enableTime: true,
          dateFormat: `d/m/y H:i`,
          defaultDate: this._datepickerStart.selectedDates[0],
          onChange: this._endDateChangeHandler,
          minDate: this._datepickerStart.selectedDates[0]
        }
    );
  }

  _endDateChangeHandler([userDate]) {
    this._calculateDifferenceTime(dayjs(this._data.time.begin), dayjs(this._datepickerEnd.selectedDates[0]));

    const newTime = Object.assign(
        {},
        {
          begin: dayjs(this._data.time.begin),
          end: dayjs(userDate),
          difference: this._updateDifferent,
        }
    );

    this.updateData({
      time: newTime
    }, true);
  }

  _editClickHandler(evt) {
    evt.preventDefault();
    this._callback.editClick();
  }

  _formDeleteClickHandler(evt) {
    evt.preventDefault();
    this._callback.deleteClick(EventEdit.parseDataToTask(this._data));
  }

  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, this._formDeleteClickHandler);
  }

  setEditClickHandler(callback) {
    this._callback.editClick = callback;
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


  _setInputFilter(event) {
    const regExpr = new RegExp(`^\\d+$`);
    if (!regExpr.test(event.target.value)) {
      event.target.value = ``;
    }
  }

  _cityInputHandler(evt) {
    evt.preventDefault();
    let cityDescription = this._destinations.filter((destination) => destination.name === evt.target.value);

    if (!cityDescription.length) {
      return;
    }

    const newCity = Object.assign(
        {},
        {
          city: evt.target.value,
          description: cityDescription[0].description,
          photos: cityDescription[0].pictures,
        }
    );

    this.updateData({
      city: newCity,
    });
  }

  _typeEventChangeHandler(evt) {
    evt.preventDefault();
    let offers = this._offers.filter((offer) => offer.type.toLowerCase() === evt.target.value);

    const newType = Object.assign(
        {},
        {
          type: evt.target.value,
          offers: offers[0].offers,
        }
    );

    this.updateData({
      type: newType
    });
  }

  _offersChangeHandler(evt) {
    evt.preventDefault();
    let newOffers = {};
    let index = 0;

    newOffers = JSON.parse(JSON.stringify(this._data.type.offers.slice()));

    for (let ind in newOffers) {
      if (!newOffers[ind].title.indexOf(evt.target.name)) {
        index = ind;
      }
    }

    newOffers[index].isActive = !newOffers[index].isActive;

    const newType = Object.assign(
        {},
        {
          type: this._data.type.type,
          offers: newOffers,
        }
    );

    this.updateData({
      type: newType
    }, true);
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
