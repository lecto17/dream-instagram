type Props = {
  comments: number;
  onClick: () => void;
};
const CommentCount = ({ comments, onClick }: Props) => {
  return (
    !!comments && (
      <span
        className="font-semibold text-sm text-sky-400 cursor-pointer"
        onClick={onClick}
      >
        view all <b>{comments}</b> comments
      </span>
    )
  );
};

export default CommentCount;
