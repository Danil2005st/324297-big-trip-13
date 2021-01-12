import dayjs from "dayjs";
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const sortPointDate = (pointA, pointB) => {
  return pointA.time.begin.valueOf() - pointB.time.begin.valueOf();
};

export const sortPointPrice = (pointA, pointB) => {
  return pointB.price - pointA.price;
};

export const sortPointTime = (pointA, pointB) => {
  return dayjs(pointA.time.begin - pointA.time.end).diff(dayjs(pointB.time.begin - pointB.time.end));
};

export const isPointPast = (time) => {
  return time === null ? false : dayjs(time).isSameOrBefore(dayjs(), `D`);
};

export const isPointFuture = (time) => {
  return time === null ? false : dayjs(time).isSameOrAfter(dayjs(), `D`);
};


