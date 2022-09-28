import { Container, Grid, GridItem, Flex } from "@chakra-ui/react";
import { Actions } from "../components/Actions";
import { Log } from "../components/Log";
import { DataTable } from "../components/DataTable";
import { Radar } from "../components/Radar";
import { usePlanes } from "../hooks/usePlanes";

export default function Home() {
  const { planes } = usePlanes();

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
                <Radar planes={planes} />
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
