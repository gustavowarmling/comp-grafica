import { useRecoilState } from "recoil";
import { v4 as uuidv4 } from "uuid";

import { checkNewPlaneRules } from "./utils/newPlaneRules";
import {
  getCartesians,
  getPolars,
  getRoundedNumber,
  getRad,
} from "./utils/mathUtils";

import { airplanes, selectedAirplanes } from "../states/airplanes";
import { trackingStats } from "../states/trackingStats";
import { planesLogs } from "../states/logs";

export const usePlanes = () => {
  const [planes, setPlanes] = useRecoilState(airplanes);
  const [selectedPlanes, setSelectedPlanes] = useRecoilState(selectedAirplanes);
  const [, setStats] = useRecoilState(trackingStats);
  const [, setLogs] = useRecoilState(planesLogs);

  const cleanLogAndStats = () => {
    setStats({
      minimumDistanceAirport: 0,
      minimumDistanceAirplanes: 0,
      minimumTimeColisions: 0,
    });
    setLogs([]);
  };

  const createPlane = ({
    id,
    plane_x,
    plane_y,
    plane_radius,
    plane_angle,
    plane_speed,
    plane_direction,
  }) => {
    checkNewPlaneRules({ planes, plane_x, plane_y });

    cleanLogAndStats();

    plane_x = Number(plane_x);
    plane_y = Number(plane_y);
    plane_radius = Number(plane_radius);
    plane_angle = Number(plane_angle);
    plane_speed = Number(plane_speed);
    plane_direction = Number(plane_direction);

    let x = 0;
    let y = 0;

    if (plane_radius || plane_angle) {
      const { x: xCart, y: yCart } = getCartesians(plane_radius, plane_angle);

      x = xCart;
      y = yCart;
    }

    if (plane_x || plane_y) {
      const { radius, angle } = getPolars(plane_x, plane_y);

      x = radius;
      y = angle;
    }

    x = getRoundedNumber(x);
    y = getRoundedNumber(y);

    const newPlaneId = uuidv4();

    setPlanes([
      ...planes,
      {
        id: id || newPlaneId,
        plane_x: plane_x === null ? x : plane_x,
        plane_y: plane_y === null ? y : plane_y,
        plane_radius: plane_radius || x,
        plane_angle: plane_angle || y,
        plane_speed,
        plane_direction,
      },
    ]);
  };

  const updatePlane = (id, fields) => {
    const idCompare = (plane) => plane.id === id;

    const newPlane = {
      ...planes.find(idCompare),
      ...fields,
    };

    const planeIndex = planes.findIndex(idCompare);

    let updatedPlanes = [...planes];
    updatedPlanes[planeIndex] = newPlane;

    cleanLogAndStats();
    setPlanes([...updatedPlanes]);
  };

  const removePlane = (id) => {
    const updatedList = planes.filter((plane) => plane.id !== id);

    const selectedPlanesList = selectedPlanes.filter((plane) => plane !== id);

    cleanLogAndStats();
    setPlanes([...updatedList]);
    setSelectedPlanes([...selectedPlanesList]);
  };

  const translatePlanes = (x, y) => {
    const numberX = Number(x);
    const numberY = Number(y);

    if (numberX === 0 && numberY === 0) return;

    const savedPlanes = [...planes];

    if (selectedPlanes.length < 1) {
      return;
    }

    selectedPlanes.forEach((selectedPlane) => {
      const idCompare = (plane) => plane.id === selectedPlane;
      const planeIndex = savedPlanes.findIndex(idCompare);
      const actualPlane = savedPlanes[planeIndex];

      const newX = Number(actualPlane.plane_x) + numberX;
      const newY = Number(actualPlane.plane_y) + numberY;

      if (newX > 8 || newX < -8) {
        throw new Error(
          `Valor total para X de ${selectedPlane} deve ser entre -8 e 8`
        );
      }

      if (newY > 8 || newY < -8) {
        throw new Error(
          `Valor total para Y de ${selectedPlane} deve ser entre -8 e 8`
        );
      }

      const { radius, angle } = getPolars(newX, newY);

      savedPlanes[planeIndex] = {
        ...actualPlane,
        plane_x: newX,
        plane_y: newY,
        plane_radius: radius,
        plane_angle: angle,
      };
    });

    cleanLogAndStats();
    setPlanes([...savedPlanes]);
  };

  const scalePlanes = (x, y) => {
    const numberX = Number(x);
    const numberY = Number(y);

    if (numberX === 0 && numberY === 0) return;

    const savedPlanes = [...planes];

    if (selectedPlanes.length < 1) {
      return;
    }

    selectedPlanes.forEach((selectedPlane) => {
      const idCompare = (plane) => plane.id === selectedPlane;
      const planeIndex = savedPlanes.findIndex(idCompare);
      const actualPlane = savedPlanes[planeIndex];

      const newX = Number(actualPlane.plane_x) * numberX;
      const newY = Number(actualPlane.plane_y) * numberY;

      if (newX > 8 || newX < -8) {
        throw new Error(
          `Valor total para X de ${selectedPlane} deve ser entre -8 e 8`
        );
      }

      if (newY > 8 || newY < -8) {
        throw new Error(
          `Valor total para Y de ${selectedPlane} deve ser entre -8 e 8`
        );
      }

      const { radius, angle } = getPolars(newX, newY);

      savedPlanes[planeIndex] = {
        ...actualPlane,
        plane_x: newX,
        plane_y: newY,
        plane_radius: radius,
        plane_angle: angle,
      };
    });

    cleanLogAndStats();
    setPlanes([...savedPlanes]);
  };

  const rotatePlanes = (x, y, angle) => {
    if (angle === 0) return;

    if (selectedPlanes.length < 1) {
      return;
    }

    const savedPlanes = [...planes];
    const numberX = Number(x);
    const numberY = Number(y);
    const radAngle = getRad(angle);

    selectedPlanes.forEach((selectedPlane) => {
      const idCompare = (plane) => plane.id === selectedPlane;
      const planeIndex = savedPlanes.findIndex(idCompare);
      const actualPlane = savedPlanes[planeIndex];

      const planeX = Number(actualPlane.plane_x);
      const planeY = Number(actualPlane.plane_y);

      const newX =
        (planeX - numberX) * Math.cos(radAngle) -
        (planeY - numberY) * Math.sin(radAngle) +
        numberX;

      const newY =
        (planeX - numberX) * Math.sin(radAngle) +
        (planeY - numberY) * Math.cos(radAngle) +
        numberY;

      if (newX > 8 || newX < -8) {
        throw new Error(
          `Valor total para X de ${selectedPlane} deve ser entre -8 e 8`
        );
      }

      if (newY > 8 || newY < -8) {
        throw new Error(
          `Valor total para Y de ${selectedPlane} deve ser entre -8 e 8`
        );
      }

      const { radius, angle } = getPolars(newX, newY);

      savedPlanes[planeIndex] = {
        ...actualPlane,
        plane_x: newX,
        plane_y: newY,
        plane_radius: radius,
        plane_angle: angle,
      };
    });

    cleanLogAndStats();
    setPlanes([...savedPlanes]);
  };

  return {
    planes,
    createPlane,
    updatePlane,
    removePlane,
    translatePlanes,
    scalePlanes,
    rotatePlanes,
  };
};
