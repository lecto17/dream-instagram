type Props = {
  countOfComments: number;
  onClick: () => void;
};
const CommentCount = ({ countOfComments, onClick }: Props) => {
  return (
    countOfComments !== 0 && (
      <span
        className="font-semibold text-sm text-sky-400 cursor-pointer"
        onClick={onClick}
      >
        view all <b>{countOfComments}</b> comments
      </span>
    )
  );
};

export default CommentCount;
