'use client';

import CommentCount from '@/components/comment/CommentCount';
import CommentForm from '@/components/comment/CommentForm';
import PostModal from '@/components/modal/PostModal';
import ModalPortal from '@/components/portal/ModalPortal';
import PostDetail from '@/components/posts/PostDetail';
import PostUserAvatar from '@/components/posts/PostUserAvatar';
import ActionBar from '@/components/ui/ActionBar';
import { Comment, SimplePost, supaPost } from '@/types/post';
import { parseDate } from '@/utils/utils';
import { useState } from 'react';

interface PostCardProps {
  post: supaPost;
  // post: SimplePost;
  priority?: boolean;
  addCommentOnPost: (comment: Comment, postId: string) => void;
}

const location = 'Incheon, Korea';

const PostCard = ({ post, priority, addCommentOnPost }: PostCardProps) => {
  const [showable, setShowable] = useState(false);

  const showPostModal = () => {
    setShowable(true);
  };

  // const { id, createdAt, image, likes, text, userImage, username, comments } = post;
  const { id, createdAt, imageKey, authorId, caption } = post;

  return (
    <article className="border border-gray-200 shadow-md rounded-lg p-3 mb-3">
      <div className="flex w-fit items-center mb-3">
        {/* <PostUserAvatar
          user={{ username, image: userImage }}
          location={location}
        /> */}
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="max-w-[468px] object-cover aspect-square hover:cursor-pointer"
        src={imageKey}
        width={468}
        height={565}
        alt={`photo by ${authorId}`}
        fetchPriority={priority ? 'high' : 'low'}
        onClick={showPostModal}
      />
      {showable && (
        <ModalPortal>
          <PostModal onClose={() => setShowable(false)}>
            <PostDetail
              key={id}
              id={id}
              createdAt={createdAt}
              image={imageKey}
              likes={[]}
              text={caption}
              userImage={''}
              username={authorId}
            />
          </PostModal>
        </ModalPortal>
      )}
      {/* <ActionBar post={post} /> */}
      <div>
        {/* <p>
          {likes?.length ?? 0}
          {likes?.length > 1 ? ' likes' : ' like'}
        </p> */}
        <p className="flex items-center">
          {/* <span className="font-bold mr-2">{username}</span> */}
          {caption}
        </p>
        <p className="mb-5">{parseDate(createdAt)}</p>
        {/* <CommentCount
          comments={comments}
          onClick={showPostModal}
        />
        <CommentForm
          postId={post.id}
          onSubmit={addCommentOnPost}
        /> */}
      </div>
    </article>
  );
};

export default PostCard;
