import dayjs from "dayjs";
import {CITIES, DESTINATIONS, POINT_TYPES} from "../const.js";
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

const getOffers = (type) => Object.entries(offers.get(type)).map(([name, price]) => {
  return {
    name,
    price,
    isActive: Boolean(getRandomInteger(0, 1)),
  };
});

const getDestinations = () => {
  const description = DESTINATIONS.split(`. `);
  const randomInteger = getRandomInteger(1, 5);

  const str = [];
  for (let i = randomInteger; i--;) {
    str.push(description[getRandomInteger(1, description.length - 1)]);
  }
  return str.join(`. `);
};

const getPhotos = () => {
  const randomInteger = getRandomInteger(1, 10);

  const photos = [];
  for (let i = randomInteger; i--;) {
    photos.push(`http://picsum.photos/248/152?r=${Math.random()}`);
  }
  return photos;
};

const generateDestinations = () => {
  return {
    description: getDestinations(),
    photo: getPhotos(),
  };
};

const calculateDifferenceTime = (begin, end) => {
  const days = end.diff(begin, `day`);
  const hours = end.diff(begin, `hour`) % 24;
  const minutes = end.diff(begin, `minute`) % 60;
  let date;

  if (days > 0) {
    date = `${days}D ${hours}H ${minutes}M`;
  } else if (hours > 0) {
    date = `${hours}H ${minutes}M`;
  } else {
    date = `${minutes}M`;
  }

  return date;
};

const generateTime = () => {
  const daysGap = getRandomInteger(-7, 7);
  const hoursGap = getRandomInteger(0, 48);
  const minutesGap = getRandomInteger(0 , 60);
  const beginTime = dayjs().add(daysGap, `day`);
  const endTime = beginTime.add(hoursGap, `hour`).add(minutesGap, `minute`);

  return {
    begin: beginTime,
    end: endTime,
    difference: calculateDifferenceTime(beginTime, endTime),
  };
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
