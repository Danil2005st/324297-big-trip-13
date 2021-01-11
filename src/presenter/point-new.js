import EventEdit from "../view/event-edit.js";
import {generateId} from "../mock/waypoint.js";
import {remove, render, RenderPosition} from "../utils/render.js";
import {UserAction, UpdateType} from "../const.js";

export default class PointNew {
  constructor(taskListContainer, changeData) {
    this._taskListContainer = taskListContainer;
    this._changeData = changeData;

    this._taskEditComponent = null;


    this._handleCloseClick = this._handleCloseClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._setInputFilter = this._setInputFilter.bind(this);
  }

  init() {
    if (this._taskEditComponent !== null) {
      return;
    }

    this._taskEditComponent = new EventEdit();
    this._taskEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._taskEditComponent.setDeleteClickHandler(this._handleDeleteClick);

    this._taskEditComponent.setEditClickHandler(this._handleCloseClick);


    render(this._taskListContainer, this._taskEditComponent, RenderPosition.AFTERBEGIN);

    document.addEventListener(`keydown`, this._escKeyDownHandler);
    this._setInputFilter(document.getElementById("event-price-1"), function(value) {
      return /^-?\d*$/.test(value);
    });
  }

  destroy() {
    if (this._taskEditComponent === null) {
      return;
    }

    remove(this._taskEditComponent);
    this._taskEditComponent = null;

    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }

  _handleFormSubmit(task) {
    this._changeData(
      UserAction.ADD_TASK,
      UpdateType.MINOR,
      // Пока у нас нет сервера, который бы после сохранения
      // выдывал честный id задачи, нам нужно позаботиться об этом самим
      Object.assign({id: generateId()}, task)
    );
    this.destroy();
  }

  _handleDeleteClick() {
    this.destroy();
  }

  _handleCloseClick() {
    this.destroy();
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this.destroy();

      console.log('111111111')
    }
  }

  _setInputFilter(textbox, inputFilter) {
    ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function(event) {
      textbox.addEventListener(event, function() {
        if (inputFilter(this.value)) {
          this.oldValue = this.value;
          this.oldSelectionStart = this.selectionStart;
          this.oldSelectionEnd = this.selectionEnd;
        } else if (this.hasOwnProperty("oldValue")) {
          this.value = this.oldValue;
          this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
        } else {
          this.value = "";
        }
      });
    });
  }
}
