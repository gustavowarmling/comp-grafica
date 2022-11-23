const getRoundedNumber = (number) => {
  return Math.round(number * 10) / 10;
};

const getDeg = (rad) => {
  return rad * (180 / Math.PI);
};

const getRad = (deg) => {
  return (Math.PI * 2 * deg) / 360;
};

const getPolars = (x, y) => {
  const radius = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
  const angle = getDeg(Math.atan2(y, x));

  return { radius, angle };
};

const getCartesians = (radius, angle) => {
  const angleInRad = getRad(angle);

  const x = radius * Math.cos(angleInRad);
  const y = radius * Math.sin(angleInRad);

  return { x, y };
};

export { getPolars, getCartesians, getRoundedNumber, getRad };
