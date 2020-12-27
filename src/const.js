export const POINT_TYPES = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`, `Check-in`, `Sightseeing`, `Restaurant`];
export const CITIES = [`Paris`, `Vein`, `Amsterdam`, `Sochi`, `Koktebel`, `Prague`, `Tokyo`, `Mexico City`];
export const DESTINATIONS = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;
export const FILTERS = [
  {
    name: `Everything`,
    isActive: true,
  },
  {
    name: `Past`,
    isActive: false,
  },
  {
    name: `Future`,
    isActive: false,
  }
];

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
  MAJOR: `MAJOR`
};
