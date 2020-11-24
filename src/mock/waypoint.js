import dayjs from "dayjs";
import {POINT_TYPES, CITIES, DESTINATIONS} from "../const.js";
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
  const destinations = {
    description: getDestinations(),
    photo: getPhotos(),
  };

  return destinations;
};

const generateTime = () => {
  const daysGap = getRandomInteger(-7, 7);
  const hoursGap = getRandomInteger(1, 48);
  const beginTime = dayjs().add(daysGap, `day`);
  const endTime = beginTime.add(hoursGap, `hour`).add(hoursGap, `minute`);

  const times = {
    begin: beginTime,
    end: endTime,
    difference: endTime.diff(beginTime, 'day'),
  };

  console.log(times.difference);

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
