"use client";

import Avatar from "@/components/avatar/Avatar";
import { Comment } from "@/types/post";

type CommentItemProps = {
  comment: Comment;
};

const CommentItem = ({
  comment: { username, image, comment },
}: CommentItemProps) => {
  return (
    <li className="flex">
      <Avatar user={{ username, image }} size="xs" />
      <p className="flex items-center ml-1">
        <span className="font-bold mr-2">{username}</span>
        {comment}
      </p>
    </li>
  );
};

export default CommentItem;
