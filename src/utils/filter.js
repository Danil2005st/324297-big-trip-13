import {FilterType} from "../const";
import {isPointPast, isPointFuture} from "./common.js";

export const filter = {
  [FilterType.EVERYTHING]: (points) => points.filter((point) => point),
  [FilterType.PAST]: (points) => points.filter((point) => isPointPast(point.time.end)),
  [FilterType.FUTURE]: (points) => points.filter((point) => isPointFuture(point.time.begin)),
};
