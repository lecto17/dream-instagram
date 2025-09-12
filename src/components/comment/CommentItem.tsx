'use client';

import Avatar from '@/components/avatar/Avatar';
import { Comment, SupaComment } from '@/types/post';
import { SupaUserProfile } from '@/types/user';

type CommentItemProps = {
  // comment: Comment;
  comment: SupaComment;
  user: Pick<SupaUserProfile, 'avatarUrl' | 'userName'>;
};

const CommentItem = ({ comment: { body }, user }: CommentItemProps) => {
  return (
    <li className="flex">
      <Avatar
        user={user}
        size="xs"
      />
      <p className="flex items-center ml-1">
        <span className="font-bold mr-2">{user?.userName || ''}</span>
        {body}
      </p>
    </li>
  );
};

export default CommentItem;
