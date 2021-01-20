import {generateId} from "./utils/common";
import dayjs from "dayjs";

export const POINT_TYPES = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`, `Check-in`, `Sightseeing`, `Restaurant`];
export const CITIES = [`Paris`, `Vein`, `Amsterdam`, `Sochi`, `Koktebel`, `Prague`, `Tokyo`, `Mexico City`];

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
  UPDATE_TASK: `UPDATE_TASK`,
  ADD_TASK: `ADD_TASK`,
  DELETE_TASK: `DELETE_TASK`
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
