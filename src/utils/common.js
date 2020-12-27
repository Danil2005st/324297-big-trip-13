import dayjs from "dayjs";

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};
/*
export const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1)
  ];
};*/

export const sortPointDate = (pointA, pointB) => {
  return pointA.time.begin.valueOf() - pointB.time.begin.valueOf();
};

export const sortPointPrice = (pointA, pointB) => {
  return pointB.price - pointA.price;
};

export const sortPointTime = (pointA, pointB) => {
  return dayjs(pointA.time.begin - pointA.time.end).diff(dayjs(pointB.time.begin - pointB.time.end));
};
