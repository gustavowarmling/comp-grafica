export const checkNewPlaneRules = ({ planes, plane_x, plane_y }) => {
  if (planes.length >= 10) {
    throw new Error("Limite de aviões atingido");
  }

  if (plane_x > 8 || plane_x < -8) {
    throw new Error("Valor para X deve ser entre -8 e 8");
  }

  if (plane_y > 8 || plane_y < -8) {
    throw new Error("Valor para Y deve ser entre -8 e 8");
  }
};
