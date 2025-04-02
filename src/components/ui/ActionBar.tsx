import ToggleButton from "@/components/button/ToggleButton";
import BookMarkIcon from "@/components/icons/BookMarkIcon";
import BookMarkIconFilled from "@/components/icons/BookMarkIconFilled";
import HeartIcon from "@/components/icons/HeartIcon";
import HeartIconFilled from "@/components/icons/HeartIconFilled";
import usePosts from "@/hooks/usePosts";
import { SimplePost } from "@/types/post";
import useUser from "@/hooks/useUser";

type Props = {
  post: SimplePost;
};

const ActionBar = ({ post }: Props) => {
  const { setLike } = usePosts();
  const { user, setBookMarked } = useUser();

  const liked = user?.username ? post.likes?.includes(user.username) : false;
  const bookmarked = user?.bookmarks?.length
    ? user?.bookmarks?.includes(post.id)
    : false;

  const handleLike = (like: boolean) => {
    if (user) {
      setLike(post, user.username || "", like);
    }
  };

  const handleBookMark = (bookmark: boolean) => {
    if (user) {
      setBookMarked(post.id, bookmark);
    }
  };

  return (
    <div className="flex py-2 justify-between">
      <ToggleButton
        offIcon={<HeartIcon />}
        onIcon={<HeartIconFilled />}
        toggled={liked}
        onToggle={handleLike}
        ariaLabel="heart icon"
      />

      <ToggleButton
        offIcon={<BookMarkIcon />}
        onIcon={<BookMarkIconFilled />}
        toggled={bookmarked}
        onToggle={handleBookMark}
        ariaLabel="bookmark icon"
      />
    </div>
  );
};

export default ActionBar;
