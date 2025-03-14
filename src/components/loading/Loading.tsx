import GridSpinner from "@/components/spinner/GridSpinner";
import { LOADING_BAR_COLOR } from "@/constants/color";

type LoadingType = "Grid";
type Props = {
  type?: LoadingType;
  color?: string;
};

const Loading = ({ type = "Grid", color }: Props) => {
  if (type === "Grid") {
    return (
      <div className="w-full flex justify-center mt-32">
        <GridSpinner color={color ?? LOADING_BAR_COLOR} />
      </div>
    );
  }
};

export default Loading;
