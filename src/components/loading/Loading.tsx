import GridSpinner from "@/components/spinner/GridSpinner";
import { LOADING_BAR_COLOR } from "@/constants/color";
import { PulseLoader } from "react-spinners";

type LoadingType = "Grid" | "Pulse";
type Props = {
  type?: LoadingType;
  color?: string;
  style?: string;
};

const Loading = ({ type = "Grid", color, style }: Props) => {
  return (
    <div className={`w-full flex justify-center mt-32 ${style}`}>
      {type === "Grid" && <GridSpinner color={color ?? LOADING_BAR_COLOR} />}
      {type === "Pulse" && <PulseLoader color={color ?? LOADING_BAR_COLOR} />}
    </div>
  );
};

export default Loading;
