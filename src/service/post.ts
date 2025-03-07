import { client, urlFor } from "@/sanity/sanity";
import { getQuery } from "@/service/fetch";
import { SimplePost } from "@/types/post";

export const getFollowingsPost = (name: string) => {
  return client
    .fetch<SimplePost[]>(getQuery("FOLLOWINGS_POSTS", name))
    .then((posts) => {
      return posts.map((post) => ({ ...post, image: urlFor(post.image) }));
    });
};
