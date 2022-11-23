import { useRecoilState } from "recoil";
import { selectedAirplanes } from "../states/airplanes";

export const useSelectedPlanes = () => {
  const [selectedPlanes, setSelectedPlanes] = useRecoilState(selectedAirplanes);

  const onPlaneSelect = (id) => {
    if (selectedPlanes.includes(id)) {
      setSelectedPlanes(selectedPlanes.filter((plane) => plane !== id));
    } else {
      setSelectedPlanes([...selectedPlanes, id]);
    }
  };

  return {
    selectedPlanes,
    onPlaneSelect,
  };
};
