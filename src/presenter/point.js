import EventView from "../view/event.js";
import EventEdit from "../view/event-edit.js";
import {render, RenderPosition, replace, remove} from "../utils/render.js";
import {UserAction, UpdateType} from "../const.js";

const Mode = {
  DEFAULT: `DEFAULT`,
  EDITING: `EDITING`
};

export default class Point {
  constructor(eventList, changeData, changeMode) {
    this._eventList = eventList;
    this._changeData = changeData;
    this._changeMode = changeMode;
    this._eventComponent = null;
    this._eventEditComponent = null;
    this._mode = Mode.DEFAULT;

    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleCloseClick = this._handleCloseClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);

    this._setInputFilter = this._setInputFilter.bind(this);
    this._validateCity = this._validateCity.bind(this);
  }

  init(point) {
    this._point = point;
    const prevEventComponent = this._eventComponent;
    const prevEventEditComponent = this._eventEditComponent;

    console.log(point);

    this._eventComponent = new EventView(point);
    this._eventEditComponent = new EventEdit(point);
    this._eventComponent.setEditClickHandler(this._handleEditClick);
    this._eventEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._eventEditComponent.setEditClickHandler(this._handleCloseClick);
    this._eventComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._eventEditComponent.setDeleteClickHandler(this._handleDeleteClick);

    if (prevEventComponent === null || prevEventEditComponent === null) {
      render(this._eventList, this._eventComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._eventComponent, prevEventComponent);
    }

    if (this._mode === Mode.EDITING) {
      replace(this._eventEditComponent, prevEventEditComponent);
    }



    remove(prevEventComponent);
    remove(prevEventEditComponent);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceFormToCard();
    }
  }

  destroy() {
    remove(this._eventComponent);
    remove(this._eventEditComponent);
  }

  _replaceCardToForm() {
    replace(this._eventEditComponent, this._eventComponent);
    document.addEventListener(`keydown`, this._escKeyDownHandler);
    this._changeMode();
    this._mode = Mode.EDITING;

    this._setInputFilter(document.getElementById("event-price-1"), function(value) {
      return /^-?\d*$/.test(value);
    });
    this._validateCity();
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

  _replaceFormToCard() {
    replace(this._eventComponent, this._eventEditComponent);
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
    this._mode = Mode.DEFAULT;
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._eventEditComponent.reset(this._point);
      this._replaceFormToCard();
    }
  }

  _handleFavoriteClick() {
    this._changeData(
        UserAction.UPDATE_TASK,
        UpdateType.MINOR,
        Object.assign(
            {},
            this._point,
            {
              isFavorite: !this._point.isFavorite
            }
        )
    );
  }

  _handleEditClick() {
    this._replaceCardToForm();
  }

  _handleFormSubmit(update) {
    this._changeData(
      UserAction.UPDATE_TASK,
      UpdateType.MINOR,
      update
    );
    //this._changeData(point);
    this._replaceFormToCard();
  }

  _handleDeleteClick(point) {
    this._changeData(
      UserAction.DELETE_TASK,
      UpdateType.MINOR,
      point
    );
  }

  _handleCloseClick() {
    this._eventEditComponent.reset(this._point);
    this._replaceFormToCard();
  }

  _validateCity() {
    const inputCity = document.getElementById("event-destination-1");

    const modifyInput = function(e) {
      e.target.value = ``;
      console.log(333);
    };

    const resetInput = function (e) {
      e.target.value = ``;
      console.log(999);
      //inputCity.addEventListener('input', modifyInput);
    };

    const blurInput = function () {
      inputCity.removeEventListener('input', modifyInput);
      inputCity.removeEventListener('focus', resetInput);
      inputCity.removeEventListener('blur', blurInput);

    };

    //inputCity.addEventListener(`input`, modifyInput);
    inputCity.addEventListener(`focus`, resetInput);
    //inputCity.addEventListener('blur', blurInput);
  }
}
