type Props = {
  username?: string;
};
const NotFound = ({ username }: Props) => {
  return <p>{`${username}라는 사용자가 존재하지 않습니다.`}</p>;
};

export default NotFound;
