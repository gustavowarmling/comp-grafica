import { atom } from "recoil";

export const airplanes = atom({
  key: "airplanes",
  default: [],
});

export const selectedAirplanes = atom({
  key: "selectedAirplanes",
  default: [],
});
