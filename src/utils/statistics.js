import dayjs from "dayjs";

export const makeItemsUniq = (items) => [...new Set(items)];

export const countPointMoney = (points, selectType) => {
  const selectTypePoints = points.filter((point) => point.type.type === selectType);
  return selectTypePoints.reduce((acc, point) => acc + point.price, 0);
};

export const countPointsByType = (points, selectType) => {
  return points.filter((point) => point.type.type === selectType).length;
};

export const countPointsByTime = (points, selectType) => {
  const selectTypePoints = points.filter((point) => point.type.type === selectType);
  return selectTypePoints.reduce((acc, point) => acc + (dayjs(point.time.end) - dayjs(point.time.begin)), 0);
};

