import { useRecoilState } from "recoil";
import { trackingStats } from "../states/trackingStats";

export const useTrackingStats = () => {
  const [stats, setStats] = useRecoilState(trackingStats);

  const setStatValue = (stat, value) => {
    const newStats = {
      ...stats,
      [stat]: Number(value),
      updated: new Date(),
    };

    setStats(newStats);
  };

  return {
    minimumDistanceAirport: stats.minimumDistanceAirport,
    minimumDistanceAirplanes: stats.minimumDistanceAirplanes,
    minimumTimeColisions: stats.minimumTimeColisions,
    updated: stats.updated,
    setStatValue,
  };
};
