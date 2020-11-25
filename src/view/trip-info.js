import dayjs from "dayjs";

export const createTripInfo = (waypoints) => {
  let title;
  let period;

  switch (waypoints.length) {
    case 1:
      title = `${waypoints[0].city}`;
      period = `${dayjs(waypoints[0].time.begin).format(`DD MMM`)} - ${dayjs(waypoints[0].time.end).format(`DD MMM`)}`;
      break;

    case 2:
      title = `${waypoints[0].city} - ${waypoints[1].city}`;
      period = `${dayjs(waypoints[0].time.begin).format(`DD MMM`)} - ${dayjs(waypoints[1].time.end).format(`DD MMM`)}`;
      break;

    case 3:
      title = `${waypoints[0].city} - ${waypoints[1].city} - ${waypoints[waypoints.length - 1].city}`;
      period = `${dayjs(waypoints[0].time.begin).format(`DD MMM`)} - ${dayjs(waypoints[waypoints.length - 1].time.end).format(`DD MMM`)}`;
      break;

    default:
      title = `${waypoints[0].city} - ... - ${waypoints[waypoints.length - 1].city}`;
      period = `${dayjs(waypoints[0].time.begin).format(`DD MMM`)} - ${dayjs(waypoints[waypoints.length - 1].time.end).format(`DD MMM`)}`;
      break;
  }

  return `<div class="trip-info__main">
    <h1 class="trip-info__title">${title}</h1>
    <p class="trip-info__dates">${period}</p>
  </div>`;
};
