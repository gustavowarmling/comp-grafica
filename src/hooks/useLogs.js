import { useRecoilState } from "recoil";
import { planesLogs } from "../states/logs";

export const useLogs = () => {
  const [logs] = useRecoilState(planesLogs);

  return {
    logs,
  };
};
