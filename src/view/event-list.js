import Abstract from "./abstract.js";

const createEventList = () => `<ul class="trip-events__list"></ul>`;

export default class EventList extends Abstract {
  getTemplate() {
    return createEventList();
  }
}
