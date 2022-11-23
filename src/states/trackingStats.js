import { atom } from "recoil";

export const trackingStats = atom({
  key: "trackingStats",
  default: {
    minimumDistanceAirport: 0,
    minimumDistanceAirplanes: 0,
    minimumTimeColisions: 0,
  },
});
