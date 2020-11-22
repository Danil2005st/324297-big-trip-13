import {POINT_TYPES, CITIES, DESTINATIONS, PHOTO_URL} from "../const.js";
import {humanizePointStart, humanizePointPeriod} from "../utils.js";
import dayjs from "dayjs";


const createOffers = (offers) => {

  return offers.map(({name, price}) => `<li class="event__offer">
          <span class="event__offer-title">${name}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${price}</span>
        </li>`).join(``);
};

export const createEvent = (point) => {
  const {type, city, offers, destinations, time, price, isFavorite} = point;

  const favoriteClassName = isFavorite
    ? `event__favorite-btn event__favorite-btn--active`
    : `event__favorite-btn`;



  return `<li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="${dayjs(time.begin).format('YYYY-MM-DD')}">${humanizePointStart(time.begin)}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${type} ${city}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${time.begin}">${humanizePointPeriod(time.begin)}</time>
          &mdash;
          <time class="event__end-time" datetime="${time.end}">${humanizePointPeriod(time.end)}</time>
        </p>
        <p class="event__duration">30M</p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${price}</span>
      </p>

      ${offers.length > 0 ? `<h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${createOffers(offers)}
      </ul>` : ``}

      <button class="${favoriteClassName}" type="button">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`
};
