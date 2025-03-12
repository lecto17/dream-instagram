import { client, urlFor } from "@/sanity/sanity";
import { getQuery } from "@/service/fetch";
import { FullPost, SimplePost } from "@/types/post";

export const getFollowingsPost = (name: string) => {
  return client
    .fetch<SimplePost[]>(getQuery("FOLLOWINGS_POSTS", name))
    .then((posts) => {
      return posts.map((post) => ({ ...post, image: urlFor(post.image) }));
    });
};

export const getPostComments = (id: string) => {
  return client
    .fetch<FullPost>(getQuery("POST_DETAIL", id))
    .then((comments) => {
      return comments;
    });
};
