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
        <b>{countOfComments}</b> 개의 댓글 보기
      </span>
    )
  );
};

export default CommentCount;
