import { Grid, GridItem, Box, Icon } from "@chakra-ui/react";
import { MdOutlineAirplanemodeActive } from "react-icons/md";

const number_of_columns = 16;
const number_of_rows = 16;
const total_elements = number_of_columns * number_of_rows;

export const Radar = ({ planes }) => {
  const gridPlanes = planes.reduce((acc, plane) => {
    const planeGridData = {
      bottom: 30 * plane.plane_y,
      left: 30 * plane.plane_x,
      angle: plane.plane_angle,
      radius: plane.plane_radius,
    };

    acc = [...acc, planeGridData];
    return acc;
  }, []);

  return (
    <Grid
      templateColumns="repeat(16, 1fr)"
      maxW="fit-content"
      margin="0 auto"
      position="relative"
    >
      {Array.from(Array(total_elements).keys()).map((_, index) => (
        <GridItem
          key={index}
          colSpan="1"
          width="30px"
          height="30px"
          border="1px solid #D3D3D3"
        />
      ))}

      <Box
        w={3}
        h={3}
        background="black"
        position="absolute"
        top={240 - 6}
        left={240 - 6}
        borderRadius="lg"
      >
        <Box position="relative" w={3} h={3}>
          {gridPlanes.map((plane) => (
            <Box
              key={plane.id}
              w={3}
              h={3}
              position="absolute"
              bottom={`${plane.bottom}px`}
              left={`${plane.left}px`}
            >
              <Box position="relative" w={3} h={3}>
                <Icon
                  as={MdOutlineAirplanemodeActive}
                  w={10}
                  h={10}
                  position="absolute"
                  top={"-15px"}
                  left={"-14px"}
                  transform={`rotate(${plane.angle}deg) scale(${plane.radius})`}
                />
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Grid>
  );
};
