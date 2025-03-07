import dynamic from "next/dynamic";

const GridLoader = dynamic(
  () => import("react-spinners").then((lib) => lib.GridLoader),
  { ssr: false }
);

interface GridSpinnerProps {
  color: string;
}

const GridSpinner = ({ color }: GridSpinnerProps) => {
  return <GridLoader color={color} />;
};

export default GridSpinner;
