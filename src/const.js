import {generateId} from "./utils/common";
import dayjs from "dayjs";

export const FilterType = {
  EVERYTHING: `Everything`,
  PAST: `Past`,
  FUTURE: `Future`
};

export const SortType = {
  DEFAULT: `sort-day`,
  PRICE: `sort-price`,
  TIME: `sort-time`
};

export const SORTS = [
  {
    name: `Day`,
    isActive: true,
    isDisabled: false,
  },
  {
    name: `EVENT`,
    isActive: false,
    isDisabled: true,
  },
  {
    name: `Time`,
    isActive: false,
    isDisabled: false,
  },
  {
    name: `Price`,
    isActive: false,
    isDisabled: false,
  },
  {
    name: `Offers`,
    isActive: false,
    isDisabled: true,
  }
];

export const UserAction = {
  UPDATE_POINT: `UPDATE_POINT`,
  ADD_POINT: `ADD_POINT`,
  DELETE_POINT: `DELETE_POINT`
};

export const UpdateType = {
  PATCH: `PATCH`,
  MINOR: `MINOR`,
  MAJOR: `MAJOR`,
  INIT: `INIT`
};

export const BLANK_POINT = {
  id: generateId().toString(10),
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
