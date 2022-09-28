import { usePlanes } from "../../hooks/usePlanes";
import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from "@chakra-ui/react";

export const DataTable = () => {
  const { planes } = usePlanes();

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
          </Tr>
        </Thead>
        <Tbody>
          {planes.map((plane) => (
            <Tr key={plane.id}>
              <Td>X</Td>
              <Td isNumeric>{plane.id}</Td>
              <Td isNumeric>{plane.plane_x}</Td>
              <Td isNumeric>{plane.plane_y}</Td>
              <Td isNumeric>{plane.plane_radius}</Td>
              <Td isNumeric>{plane.plane_angle}</Td>
              <Td isNumeric>{plane.plane_speed}</Td>
              <Td isNumeric>{plane.plane_direction}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
