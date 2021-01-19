import {getRandomInteger} from "./utils/common";


export const POINT_TYPES = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`, `Check-in`, `Sightseeing`, `Restaurant`];
export const CITIES = [`Paris`, `Vein`, `Amsterdam`, `Sochi`, `Koktebel`, `Prague`, `Tokyo`, `Mexico City`];
export const DESTINATIONS = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

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

/*
export const POINT_TYPE = [
  {
    type: `Taxi`,
    offers: [{
      name: `Add luggage`,
      price: getRandomInteger(15, 40),
      isActive: Boolean(getRandomInteger(0, 1)),
    },
      {
        name: `Switch to comfort`,
        price: getRandomInteger(15, 40),
        isActive: Boolean(getRandomInteger(0, 1)),
      }]
  },
  {
    type: `Bus`,
    offers: [{
      name: `Add breakfast`,
      price: getRandomInteger(15, 40),
      isActive: Boolean(getRandomInteger(0, 1)),
    },
      {
        name: `Switch to comfort`,
        price: getRandomInteger(15, 40),
        isActive: Boolean(getRandomInteger(0, 1)),
      },
      {
        name: `Choose seats`,
        price: getRandomInteger(15, 40),
        isActive: Boolean(getRandomInteger(0, 1)),
      }]
  },
  {
    type: `Train`,
    offers: [{
      name: `Add meal`,
      price: getRandomInteger(15, 40),
      isActive: Boolean(getRandomInteger(0, 1)),
    },
      {
        name: `Choose seats`,
        price: getRandomInteger(15, 40),
        isActive: Boolean(getRandomInteger(0, 1)),
      }]
  },
  {
    type: `Ship`,
    offers: [{
      name: `Book tickets`,
      price: getRandomInteger(15, 40),
      isActive: Boolean(getRandomInteger(0, 1)),
    },
      {
        name: `Choose seats`,
        price: getRandomInteger(15, 40),
        isActive: Boolean(getRandomInteger(0, 1)),
      },
      {
        name: `Lunch in city`,
        price: getRandomInteger(15, 40),
        isActive: Boolean(getRandomInteger(0, 1)),
      }]
  },
  {
    type: `Transport`,
    offers: [{
      name: `Travel by train`,
      price: getRandomInteger(15, 40),
      isActive: Boolean(getRandomInteger(0, 1)),
    },
      {
        name: `Choose seats`,
        price: getRandomInteger(15, 40),
        isActive: Boolean(getRandomInteger(0, 1)),
      },
      {
        name: `Add meal`,
        price: getRandomInteger(15, 40),
        isActive: Boolean(getRandomInteger(0, 1)),
      }]
  },
  {
    type: `Drive`,
    offers: [{
      name: `Rent a car`,
      price: getRandomInteger(15, 40),
      isActive: Boolean(getRandomInteger(0, 1)),
    },
      {
        name: `Order Uber`,
        price: getRandomInteger(15, 40),
        isActive: Boolean(getRandomInteger(0, 1)),
      },
      {
        name: `Switch to Comfort`,
        price: getRandomInteger(15, 40),
        isActive: Boolean(getRandomInteger(0, 1)),
      }]
  },
  {
    type: `Flight`,
    offers: [{
      name: `Add luggage`,
      price: getRandomInteger(15, 40),
      isActive: Boolean(getRandomInteger(0, 1)),
    },
      {
        name: `Add breakfast`,
        price: getRandomInteger(15, 40),
        isActive: Boolean(getRandomInteger(0, 1)),
      },
      {
        name: `Lunch in city`,
        price: getRandomInteger(15, 40),
        isActive: Boolean(getRandomInteger(0, 1)),
      },
      {
        name: `Switch to Comfort`,
        price: getRandomInteger(15, 40),
        isActive: Boolean(getRandomInteger(0, 1)),
      }]
  },
  {
    type: `Check-in`,
    offers: [{
      name: `Lunch in city`,
      price: getRandomInteger(15, 40),
      isActive: Boolean(getRandomInteger(0, 1)),
    },
      {
        name: `Switch to Comfort`,
        price: getRandomInteger(15, 40),
        isActive: Boolean(getRandomInteger(0, 1)),
      }]
  },
  {
    type: `Sightseeing`,
    offers: [
      {
        name: `Lunch in city`,
        price: getRandomInteger(15, 40),
        isActive: Boolean(getRandomInteger(0, 1)),
      },
      {
        name: `Switch to Comfort`,
        price: getRandomInteger(15, 40),
        isActive: Boolean(getRandomInteger(0, 1)),
      }
    ]
  },
  {
    type: `Restaurant`,
    offers: [{
      name: `Add luggage`,
      price: getRandomInteger(15, 40),
      isActive: Boolean(getRandomInteger(0, 1)),
    },
      {
        name: `Add breakfast`,
        price: getRandomInteger(15, 40),
        isActive: Boolean(getRandomInteger(0, 1)),
      },
      {
        name: `Switch to Comfort`,
        price: getRandomInteger(15, 40),
        isActive: Boolean(getRandomInteger(0, 1)),
      }]
  }
];


export const CITY = [
  {
    city: `Paris`,
    description: getDestinations(),
    photos: getPhotos(),
  },
  {
    city: `Vein`,
    description: getDestinations(),
    photos: getPhotos(),
  },
  {
    city: `Amsterdam`,
    description: getDestinations(),
    photos: getPhotos(),
  },
  {
    city: `Sochi`,
    description: getDestinations(),
    photos: getPhotos(),
  },
  {
    city: `Koktebel`,
    description: getDestinations(),
    photos: getPhotos(),
  },
  {
    city: `Prague`,
    description: getDestinations(),
    photos: getPhotos(),
  },
  {
    city: `Tokyo`,
    description: getDestinations(),
    photos: getPhotos(),
  },
  {
    city: `Mexico City`,
    description: getDestinations(),
    photos: getPhotos(),
  }
];
*/
