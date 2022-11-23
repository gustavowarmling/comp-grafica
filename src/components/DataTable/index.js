/* eslint-disable react-hooks/exhaustive-deps */
import { usePlanes } from "../../hooks/usePlanes";
import { useSelectedPlanes } from "../../hooks/useSelectedPlanes";
import { MdRestoreFromTrash } from "react-icons/md";
import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Checkbox,
  Tooltip,
  Icon,
} from "@chakra-ui/react";

export const DataTable = () => {
  const { planes, removePlane } = usePlanes();
  const { onPlaneSelect } = useSelectedPlanes();

  return (
    <TableContainer>
      <Table size="md">
        <Thead>
          <Tr>
            <Th>Select</Th>
            <Th isNumeric>Id</Th>
            <Th isNumeric>X</Th>
            <Th isNumeric>Y</Th>
            <Th isNumeric>R</Th>
            <Th isNumeric>A</Th>
            <Th isNumeric>V</Th>
            <Th isNumeric>D</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {planes.map((plane) => (
            <Tr key={plane.id}>
              <Td>
                <Checkbox onChange={() => onPlaneSelect(plane.id)}></Checkbox>
              </Td>
              <Tooltip hasArrow label={plane.id}>
                <Td isNumeric maxW={5} overflow="clip">
                  {plane.id}
                </Td>
              </Tooltip>
              <Td isNumeric>{plane.plane_x}</Td>
              <Td isNumeric>{plane.plane_y}</Td>
              <Td isNumeric>{plane.plane_radius}</Td>
              <Td isNumeric>{plane.plane_angle}</Td>
              <Td isNumeric>{plane.plane_speed}</Td>
              <Td isNumeric>{plane.plane_direction}</Td>
              <Td>
                <Icon
                  cursor="pointer"
                  as={MdRestoreFromTrash}
                  w={8}
                  h={8}
                  color={"#e00000"}
                  onClick={() => removePlane(plane.id)}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
