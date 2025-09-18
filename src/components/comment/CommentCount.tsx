type Props = {
  countOfComments: number;
  onClick: () => void;
};
const CommentCount = ({ countOfComments, onClick }: Props) => {
  return (
    countOfComments !== 0 && (
      <button
        type="button"
        className="font-semibold text-sm text-sky-400 cursor-pointer"
        onClick={onClick}
        aria-label="댓글 보기"
      >
        <b>{countOfComments}</b> 개의 댓글 보기
      </button>
    )
  );
};

export default CommentCount;
