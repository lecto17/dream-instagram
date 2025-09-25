'use client';

import CommentCount from '@/components/comment/CommentCount';
import CommentForm from '@/components/comment/CommentForm';
import PostModal from '@/components/modal/PostModal';
import ModalPortal from '@/components/portal/ModalPortal';
import PostDetail from '@/components/posts/PostDetail';
import PostUserAvatar from '@/components/posts/PostUserAvatar';
// import ActionBar from '@/components/ui/ActionBar';
import useUser from '@/hooks/useUser';
// import { Comment, SimplePost, SupaComment, SupaPost } from '@/types/post';
import { SupaComment, SupaPost } from '@/types/post';
import { parseDate } from '@/utils/utils';
import { useState } from 'react';
import ReactionSelector from '../ui/reaction/ReactionSelector';
import ReactionList from '../ui/reaction/ReactionList';
import usePosts from '@/hooks/usePosts';
import { useSearchParams } from 'next/navigation';

interface PostCardProps {
  post: SupaPost;
  priority?: boolean;
  addCommentOnPost: (comment: SupaComment, postId: string) => void;
}

const location = 'Incheon, Korea';

const PostCard = ({ post, priority, addCommentOnPost }: PostCardProps) => {
  const [showable, setShowable] = useState(false);
  const pathParams = useSearchParams();
  const date = pathParams.get('date');
  const { toggleReactionOnPost } = usePosts(date || '');

  const showPostModal = () => {
    setShowable(true);
  };

  const {
    id,
    createdAt,
    imageKey,
    authorId,
    caption,
    comments,
    author: { userName, avatarUrl },
    reactions,
  } = post;

  return (
    <article className="border border-gray-200 shadow-md rounded-lg p-3 mb-3 min-w-[320px] sm:min-w-[468px]">
      <div className="flex w-fit items-center mb-3">
        <PostUserAvatar
          user={{
            userName,
            avatarUrl,
          }}
          location={location}
        />
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {imageKey && (
        <img
          className="max:w-[320px] sm:max-w-[468px] object-cover aspect-square hover:cursor-pointer"
          src={imageKey}
          width={468}
          height={565}
          alt={`photo by ${authorId}`}
          fetchPriority={priority ? 'high' : 'low'}
          onClick={showPostModal}
        />
      )}
      {showable && (
        <ModalPortal>
          <PostModal onClose={() => setShowable(false)}>
            <PostDetail
              key={id}
              post={post}
              onReactionClick={toggleReactionOnPost}
            />
          </PostModal>
        </ModalPortal>
      )}
      <ReactionSelector
        onReactionClick={toggleReactionOnPost}
        postOrCommentId={post.id}
      />
      <ReactionList
        postOrCommentId={post.id}
        reactions={reactions}
        onReactionClick={toggleReactionOnPost}
      />
      <div className="py-2">
        <p className="flex items-center whitespace-pre-line mb-2 sm:mb-3">
          {caption}
        </p>
        <p className="mb-2 sm:mb-5 text-gray-400 text-sm">
          {parseDate(createdAt)}
        </p>
        <CommentCount
          countOfComments={comments}
          onClick={showPostModal}
        />
        <CommentForm
          postId={post.id}
          onSubmit={addCommentOnPost}
        />
      </div>
    </article>
  );
};

export default PostCard;
