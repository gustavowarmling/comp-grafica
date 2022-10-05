import { useRecoilState } from "recoil";
import { v4 as uuidv4 } from "uuid";
import { airplanes } from "../states/airplanes";

export const usePlanes = () => {
  const [planes, setPlanes] = useRecoilState(airplanes);

  const createPlane = ({
    plane_x,
    plane_y,
    plane_radius,
    plane_angle,
    plane_speed,
    plane_direction,
  }) => {
    if (planes.length >= 10) {
      throw new Error("Limite de aviões atingido");
    }

    if (plane_x > 8 || plane_x < -8) {
      throw new Error("Valor para X deve ser entre -8 e 8");
    }

    if (plane_y > 8 || plane_y < -8) {
      throw new Error("Valor para Y deve ser entre -8 e 8");
    }

    setPlanes([
      ...planes,
      {
        id: uuidv4(),
        plane_x,
        plane_y,
        plane_radius,
        plane_angle,
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

    setPlanes([...updatedPlanes]);
  };

  return {
    planes,
    createPlane,
    updatePlane,
  };
};
