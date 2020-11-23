import dayjs from "dayjs";
import {POINT_TYPES, CITIES, DESTINATIONS, PHOTO_URL} from "../const.js";
import {getRandomInteger} from "../utils.js";

const generatePrice = () => getRandomInteger(0, 1000);

const generateTypePoint = () => {
  const randomIndex = getRandomInteger(0, POINT_TYPES.length - 1);

  return POINT_TYPES[randomIndex];
};

const getRandomCity = () => {
  const randomIndex = getRandomInteger(0, CITIES.length - 1);

  return CITIES[randomIndex];
};

const offers = new Map();

for (const type of POINT_TYPES) {
  offers.set(type, {
    'Add luggage': getRandomInteger(15, 40),
    'Switch to comfort': getRandomInteger(7, 40),
    'Choose seats': getRandomInteger(2, 40),
    'Add meal': getRandomInteger(10, 40),
    'Travel by train': getRandomInteger(5, 40),
  });
}

const getOffers = (type) => {
  const offerList = Object.entries(offers.get(type)).map(([name, price]) => {
    return {
      name,
      price,
      isActive:Boolean(getRandomInteger(0, 1)),
    };
  });
  return offerList;
};

const getDestinations = () => {
  const decription = DESTINATIONS.split(`. `);
  const randomInteger = getRandomInteger(1, 5);

  const str = [];
  for (let i = randomInteger; i--;) {
    str.push(decription[getRandomInteger(1, decription.length - 1)]);
  }
  return str.join(`. `);
};

const generateDestinations = () => {
  const destinations = {
    decription: getDestinations(),
    photo: PHOTO_URL,
  };

  return destinations;
};

const generateTime = () => {
  const daysGap = getRandomInteger(-7, 7);
  const hoursGap = getRandomInteger(1, 24);
  const beginTime = dayjs().add(daysGap, `day`);
  const endTime = beginTime.add(hoursGap, `hour`).add(hoursGap, `minute`);

  const times = {
    begin: beginTime,
    end: endTime,
    difference: endTime.diff(beginTime , 'millisecond'),
  };

  return times;
};


export const generatePoint = () => {

  return {
    type: generateTypePoint(),
    city: getRandomCity(),
    offers: getOffers(generateTypePoint()),
    destinations: generateDestinations(),
    time: generateTime(),
    price: generatePrice(),
    isFavorite: Boolean(getRandomInteger(0, 1)),
  };
};
