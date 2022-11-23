import { useRecoilState } from "recoil";

import { Container, Grid, GridItem, Flex } from "@chakra-ui/react";
import { Actions } from "../components/Actions";
import { Log } from "../components/Log";
import { DataTable } from "../components/DataTable";
import { Radar } from "../components/Radar";
import { usePlanes } from "../hooks/usePlanes";
import { collisionsPoints } from "../states/collisionsPoints";

export default function Home() {
  const { planes } = usePlanes();
  const [collisions] = useRecoilState(collisionsPoints);

  return (
    <Container maxW="container.xl" marginTop={4}>
      <Grid templateColumns="repeat(8, 1fr)" gap={4}>
        <GridItem colSpan={2}>
          <Actions />
        </GridItem>

        <GridItem colSpan={6}>
          <Grid
            templateRows="repeat(2, 100%, 1fr)"
            templateColumns="repeat(9, 1fr)"
            gap={4}
          >
            <GridItem colSpan={5} maxW="fit-content">
              <Flex direction="column" maxW="fit-content">
                <Radar planes={planes} collisions={collisions} />
              </Flex>
            </GridItem>

            <GridItem colSpan={4}>
              <Log />
            </GridItem>

            <GridItem colSpan={9}>
              <DataTable />
            </GridItem>
          </Grid>
        </GridItem>
      </Grid>
    </Container>
  );
}
