import ToggleButton from "@/components/button/ToggleButton";
import BookMarkIcon from "@/components/icons/BookMarkIcon";
import BookMarkIconFilled from "@/components/icons/BookMarkIconFilled";
import HeartIcon from "@/components/icons/HeartIcon";
import HeartIconFilled from "@/components/icons/HeartIconFilled";
import usePosts from "@/hooks/usePosts";
import { SimplePost } from "@/types/post";
import { useSession } from "next-auth/react";
import { useState } from "react";

type Props = {
  post: SimplePost;
};

const ActionBar = ({ post }: Props) => {
  const { data: session } = useSession();
  const user = session?.user;

  const liked = user?.username ? post.likes?.includes(user.username) : false;
  const [bookmarked, setBookmarked] = useState(false);
  const { setLike } = usePosts();

  const handleLike = (like: boolean) => {
    if (user) {
      setLike(post, user.username || "", like);
    }
  };

  return (
    <div className="flex py-2 justify-between">
      <ToggleButton
        offIcon={<HeartIcon />}
        onIcon={<HeartIconFilled />}
        toggled={liked}
        onToggle={handleLike}
      />

      <ToggleButton
        offIcon={<BookMarkIcon />}
        onIcon={<BookMarkIconFilled />}
        toggled={bookmarked}
        onToggle={setBookmarked}
      />
    </div>
  );
};

export default ActionBar;
