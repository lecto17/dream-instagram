'use client';

import Avatar from '@/components/avatar/Avatar';
import { SupaComment } from '@/types/post';
import { SupaUserProfile } from '@/types/user';
import ReactionList from '../ui/reaction/ReactionList';
import { TransformedReactionStats } from '@/types/reaction';
import ReactionSelector from '../ui/reaction/ReactionSelector';

type CommentItemProps = {
  // comment: Comment;
  comment: SupaComment;
  user: Pick<SupaUserProfile, 'avatarUrl' | 'userName'>;
  postId: string;
  reactions: TransformedReactionStats[];
  onReactionClick: (postOrCommentId: string, reaction: string) => void;
};

const CommentItem = ({
  comment: { body, id },
  user,
  postId,
  reactions,
  onReactionClick,
}: CommentItemProps) => {
  return (
    <li className="flex">
      <Avatar
        user={user}
        size="xs"
      />
      <div className="flex flex-col ml-1">
        <div className="flex items-center">
          <span className="font-bold mr-2">{user?.userName}</span>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center space-x-1 sm:space-x-2">
            <span>{body}</span>
            {(reactions == null || reactions?.length === 0) && (
              <ReactionSelector
                postOrCommentId={id!}
                onReactionClick={onReactionClick}
              />
            )}
          </div>
          <div className="flex items-center space-x-1 sm:space-x-2">
            <ReactionList
              postOrCommentId={id!}
              reactions={reactions}
              onReactionClick={onReactionClick}
            />
            {reactions?.length > 0 && (
              <ReactionSelector
                postOrCommentId={id!}
                onReactionClick={onReactionClick}
              />
            )}
          </div>
        </div>
      </div>
    </li>
  );
};

export default CommentItem;
