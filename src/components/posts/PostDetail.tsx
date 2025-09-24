'use client';

import CommentForm from '@/components/comment/CommentForm';
import CommentItem from '@/components/comment/CommentItem';
import PostUserAvatar from '@/components/posts/PostUserAvatar';
// import ActionBar from '@/components/ui/ActionBar';
import useComment from '@/hooks/useComment';
import { SupaPost } from '@/types/post';
import { parseDate } from '@/utils/utils';
import { useCallback } from 'react';

const PostDetail = ({ post }: { post: SupaPost }) => {
  const {
    id,
    createdAt,
    imageKey,
    caption,
    author: { userName, avatarUrl },
  } = post;
  const { comments, setComment, toggleReactionOnComment } = useComment(id);

  const suppressEventBubbling = useCallback((e: React.MouseEvent<Element>) => {
    e.stopPropagation();
  }, []);

  return (
    <article
      className="flex flex-col items-center justify-center pt-[10px] overflow-hidden w-[350px] min-h-[500px] bg-white lg:w-[1000px] lg:h-[700px] lg:flex-row lg:pt-0"
      onClick={suppressEventBubbling}
    >
      <div className="flex justify-center h-3/5 w-[90%] sm:w-full sm:h-full sm:basis-3/5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="w-[90%] sm:w-full max-h-[800px] object-cover hover:cursor-pointer md:h-full lg:object-cover"
          src={imageKey}
          alt={`photo by ${userName}`}
          fetchPriority={'auto'}
        />
      </div>
      <div className="w-full h-full flex flex-col basis-2/5">
        <div className="hidden lg:flex lg:w-full items-center border-b border-gray-200 p-2 mb-2">
          <PostUserAvatar user={{ userName, avatarUrl }} />
        </div>
        <div className="h-full flex flex-col justify-between">
          <div className="flex flex-col p-1 sm:p-3">
            <div className="flex items-center mb-2">
              <PostUserAvatar
                user={{ userName, avatarUrl }}
                avatarSize="xs"
                noLocation
              >
                <span>{caption}</span>
              </PostUserAvatar>
            </div>

            <ul className="comments-wrapper max-h-[128px] sm:max-h-[448px] flex flex-col space-y-1 overflow-y-auto">
              {comments != null &&
                comments.length > 0 &&
                comments.map((comment) => (
                  <CommentItem
                    key={comment.id}
                    comment={comment}
                    user={{
                      userName: comment.userName,
                      avatarUrl: comment.avatarUrl,
                    }}
                    postId={id}
                    reactions={comment.reactions}
                    onReactionClick={toggleReactionOnComment}
                  />
                ))}
            </ul>
          </div>
          <div className="flex flex-col">
            <div className="hidden sm:flex p-3 text-base">
              <p className="text-neutral-400">{parseDate(createdAt)}</p>
            </div>
            <CommentForm
              formStyle={'border-t border-gray-300 p-1 sm:p-3'}
              postId={id}
              onSubmit={setComment}
            />
          </div>
        </div>
      </div>
    </article>
  );
};

export default PostDetail;
