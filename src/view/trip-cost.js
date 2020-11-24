export const createTripCost = (waypoints) => {
  let totalPrice = 0;
  for (const {price} of waypoints) {
    totalPrice += price;
  };
  return `<p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalPrice}</span>
  </p>`;
};
