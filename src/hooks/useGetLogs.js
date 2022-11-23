import { useRecoilState } from "recoil";
import { planesLogs } from "../states/logs";
import { airplanes } from "../states/airplanes";
import { trackingStats } from "../states/trackingStats";
import { collisionsPoints } from "../states/collisionsPoints";

import { getTimeDistance } from "./utils/colisionRules";
import { LogType } from "../types/logs";

export const useGetLogs = () => {
  const [, setLogs] = useRecoilState(planesLogs);
  const [planes] = useRecoilState(airplanes);
  const [stats] = useRecoilState(trackingStats);
  const [, setCollisionsPoints] = useRecoilState(collisionsPoints);

  const {
    minimumTimeColisions,
    minimumDistanceAirport,
    minimumDistanceAirplanes,
  } = stats;

  const generateColisionsRoutesLogs = () => {
    const newLogs = [];
    const collisions = [];

    planes.map((airplane, index) => {
      for (let i = index + 1; i <= planes.length - 1; i++) {
        const {
          timeToColision,
          riskOfColision,
          timeToPointA,
          timeToPointB,
          colisionX,
          colisionY,
        } = getTimeDistance(airplane, planes[i]);

        if (timeToColision <= minimumTimeColisions && riskOfColision) {
          console.log(colisionX);

          collisions.push({
            x: colisionX,
            y: colisionY,
          });

          newLogs.push({
            id: newLogs.length + 1 + timeToColision,
            type: LogType.error,
            message: `Os aviões (${airplane.plane_x}, ${airplane.plane_y}) e (${
              planes[i].plane_x
            }, ${
              planes[i].plane_y
            }) estão em rota de colisão com diferença de ${timeToColision.toFixed(
              2
            )} segundos. (${airplane.plane_x}, ${
              airplane.plane_y
            }) chegará em ${timeToPointA.toFixed(2)} segundos. (${
              planes[i].plane_x
            }, ${planes[i].plane_y}) chegará em ${timeToPointB.toFixed(
              2
            )} segundos.`,
            timeToColision,
          });
        }
      }
    });

    setLogs([]);
    setCollisionsPoints([]);
    setCollisionsPoints(collisions);
    setLogs(newLogs.sort((a, b) => a.timeToColision - b.timeToColision));
  };

  const getAirplanesNextToAirport = () => {
    const newLogs = [];

    planes.map((airplane) => {
      const distance = Number(
        Math.sqrt(
          Math.pow(0 - airplane.plane_x, 2) + Math.pow(0 - airplane.plane_y, 2)
        ).toFixed(4)
      );

      if (distance <= minimumDistanceAirport) {
        newLogs.push({
          id: newLogs.length + 1 + distance,
          type: LogType.warning,
          message: `O avião (${airplane.plane_x}, ${
            airplane.plane_y
          }) está próximo do aeroporto com distância de ${distance.toFixed(
            2
          )}km.`,
          distance,
        });
      }
    });

    setLogs([]);
    setLogs(newLogs.sort((a, b) => a.distance - b.distance));
  };

  const getNextPlanes = () => {
    const newLogs = [];

    planes.map((airplane, index) => {
      for (let i = index + 1; i <= planes.length - 1; i++) {
        const distance = Number(
          Math.sqrt(
            Math.pow(planes[i].plane_x - airplane.plane_x, 2) +
              Math.pow(planes[i].plane_y - airplane.plane_y, 2)
          ).toFixed(4)
        );

        if (distance <= minimumDistanceAirplanes) {
          newLogs.push({
            id: newLogs.length + 1 + distance,
            type: LogType.warning,
            message: `Os aviões (${airplane.plane_x}, ${airplane.plane_y}) e (${
              planes[i].plane_x
            }, ${
              planes[i].plane_y
            }) estão próximos com distância de ${distance.toFixed(2)}km.`,
            distance,
          });
        }
      }
    });

    setLogs([]);
    setLogs(newLogs.sort((a, b) => a.distance - b.distance));
  };

  return {
    generateColisionsRoutesLogs,
    getAirplanesNextToAirport,
    getNextPlanes,
  };
};
