"use client";

import Avatar from "@/components/avatar/Avatar";
import { Comment } from "@/types/post";

type CommentItemProps = {
  comment: Comment;
};

const CommentItem = ({ comment: { user, comment } }: CommentItemProps) => {
  return (
    <li className="flex">
      <Avatar user={user} size="xs" />
      <p className="flex items-center ml-1">
        <span className="font-bold mr-2">{user?.username || ""}</span>
        {comment}
      </p>
    </li>
  );
};

export default CommentItem;
