import { getRad } from "./mathUtils";

export function getTimeDistance(airplaneA, airplaneB) {
  const directionAInRad = getRad(airplaneA.plane_direction);
  const directionBInRad = getRad(airplaneB.plane_direction);

  if (airplaneA.plane_direction === 90 || airplaneA.plane_direction === 270) {
    return handle90and270cases(airplaneA, airplaneB, directionBInRad);
  } else if (
    airplaneB.plane_direction === 90 ||
    airplaneB.plane_direction === 270
  ) {
    const inverter = handle90and270cases(airplaneB, airplaneA, directionAInRad);

    return {
      ...inverter,
      timeToPointA: inverter.timeToPointB,
      timeToPointB: inverter.timeToPointA,
    };
  }

  const coefA = Number(Math.tan(directionAInRad).toFixed(2)) || 0;

  const coefB = Number(Math.tan(directionBInRad).toFixed(2)) || 0;

  const yInicialA = coefA * -airplaneA.plane_x + airplaneA.plane_y,
    xInicialA = coefA;

  const yInicialB = coefB * -airplaneB.plane_x + airplaneB.plane_y,
    xInicialB = coefB;

  const ladoX = xInicialA + xInicialB * -1,
    ladoY = yInicialA * -1 + yInicialB;

  const xColision = ladoY / ladoX;

  if (
    xColision === null ||
    xColision === undefined ||
    xColision === NaN ||
    Math.abs(xColision) === Infinity
  ) {
    return {
      riskOfColision: false,
      timeToColision: 0,
      timeToPointA: 0,
      timeToPointB: 0,
    };
  }

  const yColision =
    xInicialA < 0
      ? -(xInicialA * xColision) + yInicialA
      : xInicialA * xColision + yInicialA;

  const dA = Number(
      Math.sqrt(
        Math.pow(xColision - airplaneA.plane_x, 2) +
          Math.pow(yColision - airplaneA.plane_y, 2)
      ).toFixed(4)
    ),
    dB = Number(
      Math.sqrt(
        Math.pow(xColision - airplaneB.plane_x, 2) +
          Math.pow(yColision - airplaneB.plane_y, 2)
      ).toFixed(4)
    );

  let riskOfColision = true;

  const tA = (dA / airplaneA.plane_speed) * 3600,
    tB = (dB / airplaneB.plane_speed) * 3600;

  const timeToColision = Math.abs(tA - tB);

  if (Math.sin(directionAInRad) > 0 || Math.sin(directionBInRad) > 0) {
    riskOfColision = yColision >= 0;
  } else {
    riskOfColision = yColision <= 0;
  }

  if (Math.cos(directionAInRad) > 0 || Math.cos(directionBInRad) > 0) {
    riskOfColision = xColision >= 0;
  } else {
    riskOfColision = xColision <= 0;
  }

  return {
    riskOfColision,
    timeToColision,
    timeToPointA: tA,
    timeToPointB: tB,
    colisionX: xColision,
    colisionY: yColision,
  };
}

function handle90and270cases(airplaneA, airplaneB, directionBInRad) {
  const coefB = Number(Math.tan(directionBInRad).toFixed(2)) || 0;

  const yFinalB = coefB * -airplaneB.plane_x + airplaneB.plane_y,
    xFinalB = coefB;

  const xColision = airplaneA.plane_x;

  const yColision = xFinalB * airplaneA.plane_x + yFinalB;

  let riskOfColision = true;

  const dA = Number(
      Math.sqrt(
        Math.pow(xColision, 2) + Math.pow(yColision - airplaneA.plane_y, 2)
      ).toFixed(4)
    ),
    dB = Number(
      Math.sqrt(
        Math.pow(xColision - airplaneB.plane_x, 2) +
          Math.pow(yColision - airplaneB.plane_y, 2)
      ).toFixed(4)
    );

  const tA = (dA / airplaneA.plane_speed) * 3600,
    tB = (dB / airplaneB.plane_speed) * 3600;

  const timeToColision = Math.abs(tA - tB);

  return {
    riskOfColision,
    timeToColision,
    timeToPointA: tA,
    timeToPointB: tB,
    colisionX: xColision,
    colisionY: yColision,
  };
}
