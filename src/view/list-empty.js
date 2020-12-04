import Abstract from "./abstract.js";

const createEmptyEventList = () => `<p class="trip-events__msg">Click New Event to create your first point</p>`;

export default class EmptyEventList extends Abstract {
  getTemplate() {
    return createEmptyEventList();
  }
}
