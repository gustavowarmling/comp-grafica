/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useGetLogs } from "../../hooks/useGetLogs";
import { useTrackingStats } from "../../hooks/useTrackingStats";
import { List, ListItem, ListIcon } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { useLogs } from "../../hooks/useLogs";

import { LogTypeColor } from "../../types/logs";

export const Log = () => {
  const { logs } = useLogs();
  const {
    generateColisionsRoutesLogs,
    getAirplanesNextToAirport,
    getNextPlanes,
  } = useGetLogs();
  const {
    minimumDistanceAirplanes,
    minimumDistanceAirport,
    minimumTimeColisions,
  } = useTrackingStats();

  useEffect(() => {
    getNextPlanes();
  }, [minimumDistanceAirplanes]);

  useEffect(() => {
    getAirplanesNextToAirport();
  }, [minimumDistanceAirport]);

  useEffect(() => {
    generateColisionsRoutesLogs();
  }, [minimumTimeColisions]);

  return (
    <List
      spacing={5}
      maxH="480px"
      minH="480px"
      overflowY="scroll"
      p="16px"
      border="1px solid #c7c7c7"
      borderRadius="lg"
    >
      {logs.map(
        (log) =>
          log.message && (
            <ListItem key={log.id}>
              <ListIcon as={ChevronRightIcon} color={LogTypeColor[log.type]} />
              {log.message}
            </ListItem>
          )
      )}
    </List>
  );
};
