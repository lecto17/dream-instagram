"use client";

import Avatar from "@/components/avatar/Avatar";
import CommentForm from "@/components/comment/CommentForm";
import CommentItem from "@/components/comment/CommentItem";
import BookMarkIcon from "@/components/icons/BookMarkIcon";
import HeartIcon from "@/components/icons/HeartIcon";
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

  console.log("final comments: ", comments);

  const suppressEventBubbling = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
    },
    []
  );

  return (
    <div
      className="w-[900px] h-[700px] flex bg-white"
      onClick={suppressEventBubbling}
    >
      <article className="w-full h-full flex">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="w-[60%] max-h-[800px] flex object-cover hover:cursor-pointerr"
          src={image}
          alt={`photo by ${username}`}
          fetchPriority={"auto"}
        />
        <div className="w-[40%] h-full flex flex-col">
          <div className="flex w-full items-center border-b border-gray-200 p-2 mb-2">
            <Avatar user={{ username, image: userImage }} size="small" />
            <p className="flex flex-col ml-2 text-base text-gray-700">
              <span className="font-semibold">{username}</span>
              <span className="text-xs leading-3 text-gray-500">
                {"인천광역시, 영종도"}
              </span>
            </p>
          </div>
          <div className="h-full flex flex-col justify-between">
            <div className="flex flex-col p-3">
              <div className="flex items-center mb-2">
                <Avatar user={{ username, image: userImage }} size="xs" />
                <p className="flex items-center ml-1">
                  <span className="font-bold mr-2">{username}</span>
                  {text}
                </p>
              </div>
              <div className="comments-wrapper flex flex-col space-y-1">
                {comments &&
                  comments.map((comment, idx) => (
                    <CommentItem
                      key={`${comment.id}-${idx}`}
                      comment={comment}
                    />
                  ))}
              </div>
            </div>
            <div className="flex flex-col">
              <div className="p-3">
                <div className="flex justify-between">
                  <HeartIcon />
                  <BookMarkIcon />
                </div>

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
    </div>
  );
};

export default PostDetail;
