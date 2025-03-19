"use client";

import CommentForm from "@/components/comment/CommentForm";
import CommentItem from "@/components/comment/CommentItem";
import PostUserAvatar from "@/components/posts/PostUserAvatar";
import ActionBar from "@/components/ui/ActionBar";
import { Comment } from "@/types/post";
import { parseDate } from "@/utils/utils";
import { useCallback } from "react";
import useSWR from "swr";

type PostDetailProps = {
  id: string;
  createdAt: string;
  image: string;
  likes: string[];
  text: string;
  userImage: string;
  username: string;
};

const PostDetail = ({
  id,
  createdAt,
  image,
  likes,
  text,
  userImage,
  username,
}: PostDetailProps) => {
  const { data: comments } = useSWR<Comment[]>(`/api/posts/${id}`);

  const suppressEventBubbling = useCallback((e: React.MouseEvent<Element>) => {
    e.stopPropagation();
  }, []);

  return (
    <article
      className="w-[1000px] h-[700px] flex bg-white"
      onClick={suppressEventBubbling}
    >
      <div className="w-full flex basis-3/5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="w-full max-h-[800px] object-cover hover:cursor-pointerr"
          src={image}
          alt={`photo by ${username}`}
          fetchPriority={"auto"}
        />
      </div>
      <div className="w-full h-full flex flex-col basis-2/5 ">
        <div className="flex w-full items-center border-b border-gray-200 p-2 mb-2">
          <PostUserAvatar user={{ username, image: userImage }} />
        </div>
        <div className="h-full flex flex-col justify-between">
          <div className="flex flex-col p-3">
            <div className="flex items-center mb-2">
              <PostUserAvatar
                user={{ username, image: userImage }}
                avatarSize="xs"
                noLocation
              >
                <span>{text}</span>
              </PostUserAvatar>
            </div>
            <ul className="comments-wrapper flex flex-col space-y-1 max-h-[420px] overflow-y-auto">
              {comments?.length &&
                comments[0] &&
                comments.map((comment, idx) => (
                  <CommentItem key={`${comment.id}-${idx}`} comment={comment} />
                ))}
            </ul>
          </div>
          <div className="flex flex-col">
            <div className="p-3">
              <ActionBar
                post={{
                  id,
                  username,
                  userImage,
                  image,
                  text,
                  likes,
                  createdAt,
                  comments: comments?.length || 0,
                }}
              />

              <p className="font-semibold">
                {likes?.length ?? 0}
                {likes?.length > 1 ? " likes" : " like"}
              </p>
              <p className="text-neutral-400">{parseDate(createdAt)}</p>
            </div>
            <CommentForm formStyle={"border-t border-gray-300 p-3"} />
          </div>
        </div>
      </div>
    </article>
  );
};

export default PostDetail;
