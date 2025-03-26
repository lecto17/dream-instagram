import { memo } from "react";

type Props = {
  onClick: () => void;
};

const PublishButton = memo(function PublishButton({ onClick }: Props) {
  const handleClick = async () => {
    onClick();
  };
  return (
    <button
      className="w-full border bg-sky-500 py-3 rounded-md text-white hover:bg-sky-600 transition"
      onClick={handleClick}
    >
      발행
    </button>
  );
});

export default PublishButton;
