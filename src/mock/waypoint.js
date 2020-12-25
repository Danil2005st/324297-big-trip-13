import dayjs from "dayjs";
import {DESTINATIONS, POINT_TYPES} from "../const.js";
import {getRandomInteger} from "../utils/common.js";

const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);
const generatePrice = () => getRandomInteger(0, 1000);

const generateTypePoint = () => {
  const randomIndex = getRandomInteger(0, POINT_TYPES.length - 1);

  return {
    type: POINT_TYPES[randomIndex],
    offers: getOffers(POINT_TYPES[randomIndex])
  };
};

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

const getRandomCity = () => {
  const randomIndex = getRandomInteger(0, CITY.length - 1);

  return {
    city: CITY[randomIndex].city,
    description: CITY[randomIndex].description,
    photos: CITY[randomIndex].photos,
  };
};

const offers = new Map();

for (const type of POINT_TYPES) {
  offers.set(type, {
    'Add luggage': getRandomInteger(15, 40),
    'Switch to comfort': getRandomInteger(7, 40),
    'Choose seats': getRandomInteger(2, 40),
    'Add meal': getRandomInteger(10, 40),
    'Order Uber': getRandomInteger(5, 40),
    'Rent a car': getRandomInteger(5, 40),
    'Add breakfast': getRandomInteger(5, 40),
    'Book tickets': getRandomInteger(5, 40),
    'Lunch in city': getRandomInteger(5, 40),
  });
}

const getOffers = (type) => {
  const typeOffers = POINT_TYPE.filter((typePoint) => typePoint.type === type);
  return typeOffers[0].offers;
};

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
  const minutesGap = getRandomInteger(0, 60);
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
    id: generateId(),
    type: generateTypePoint(),
    city: getRandomCity(),
    time: generateTime(),
    price: generatePrice(),
    isFavorite: Boolean(getRandomInteger(0, 1)),
  };
};
