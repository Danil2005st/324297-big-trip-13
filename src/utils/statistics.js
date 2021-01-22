import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";

// Используем особенности Set, чтобы удалить дубли в массиве
export const makeItemsUniq = (items) => [...new Set(items)];

export const countPointMoney = (points, selectType) => {
  const selectTypePoints = points.filter((point) => point.type.type === selectType);
  const sumTypePoint = selectTypePoints.reduce((acc, point) => acc + point.price, 0);
  return sumTypePoint;
};


export const countPointsByType = (points, selectType) => {
  return points.filter((point) => point.type.type === selectType).length;
};
