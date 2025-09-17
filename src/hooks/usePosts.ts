import { useCacheKeyContext } from '@/context/CacheKeyContext';
import { Comment, SimplePost, SupaComment, SupaPost } from '@/types/post';
import { getDateYYYYMMDDWithDash } from '@/utils/utils';
import { useCallback } from 'react';
import useSWR from 'swr';

export default function usePosts(date?: string) {
  const { postsKey } = useCacheKeyContext();
  const today = getDateYYYYMMDDWithDash().replaceAll('-', '');

  const {
    data: posts,
    isLoading,
    error,
    mutate,
    // } = useSWR<SimplePost[]>(postsKey);
  } = useSWR<SupaPost[]>(`${postsKey}?date=${date || today}`);

  // const { mutate: globalMutate } = useSWRConfig();

  const updatePostLike = async (id: string, like: boolean) => {
    return await fetch('/api/likes', {
      method: 'PUT',
      body: JSON.stringify({ id, like }),
    }).then((res) => res.json());
  };

  const setLike = useCallback(
    (post: SimplePost, username: string, like: boolean) => {
      const newPost = {
        ...post,
        likes: like
          ? post.likes?.length
            ? [...post.likes, username]
            : [username]
          : post.likes.filter((uname) => uname !== username),
      };

      const newPosts = posts?.map((postEl) =>
        post.id === postEl.id ? newPost : postEl,
      );

      mutate(updatePostLike(post.id, like), {
        optimisticData: newPosts, // newPosts로 optimistic하게 UI 변경
        populateCache: false, // default: updatePostLike(mutate의 첫번째 인자)의 결과값으로 mutate함. updatePostLike에서 필요한 데이터를 가져오는 상태 X 기에, false
        revalidate: false, // default: 첫번째 인자 실행이 완료되면 다시금 data를 call하는데, 필요없기에 false
        rollbackOnError: true, // network 와 같은 에러 상황이 발생할 경우, UI rollback.(=true일 경우)
      });
      // .then(() => {
      //   console.log("global mutate");
      //   return globalMutate(`/api/users/${post.username}/${tab}`, null, {
      //     revalidate: true,
      //   });
      // });
    },
    [posts, mutate],
  );

  const addPost = async (text: string, file?: File) => {
    const formData = new FormData();
    formData.append('text', text);
    if (file) {
      formData.append('file', file);
      formData.append('fileName', file.name);
    }

    await fetch('/api/post', {
      method: 'POST',
      body: formData,
    })
      .then(() => mutate(undefined, { revalidate: true }))
      .catch((err) => new Error(err));
  };

  const upsertCommentOnPost = useCallback(
    (postId: string, comment: SupaComment) => {
      return fetch(`/api/posts/${postId}`, {
        method: 'PUT',
        body: JSON.stringify({ postId, comment }),
      }).then((res) => res.json());
    },
    [],
  );

  // const upsertCommentOnPost = useCallback(
  //   (postId: string, comment: Comment) => {
  //     return fetch(`/api/posts/${postId}`, {
  //       method: 'PUT',
  //       body: JSON.stringify({ postId, comment }),
  //     }).then((res) => res.json());
  //   },
  //   [],
  // );

  const addCommentOnPost = useCallback(
    async (comment: SupaComment, postId: string) => {
      let newPosts;
      if (comment?.id) {
        // newPosts = comments?.map(({ id, ...rest }) =>
        //   id === comment.id
        //     ? { id, ...rest, comment: comment.comment }
        //     : { id, ...rest }
        // );
      } else {
        newPosts = posts?.map((el) => {
          if (postId === el.id) {
            return {
              ...el,
              comments: el.comments + 1,
            };
          } else return el;
        });
      }

      mutate(upsertCommentOnPost(postId, comment), {
        optimisticData: newPosts,
        populateCache: false,
        revalidate: false,
        rollbackOnError: true,
      });
    },
    [posts, mutate, upsertCommentOnPost],
  );

  // const addCommentOnPost = useCallback(
  //   async (comment: Comment, postId: string) => {
  //     let newPosts;
  //     if (comment?.id) {
  //       // newPosts = comments?.map(({ id, ...rest }) =>
  //       //   id === comment.id
  //       //     ? { id, ...rest, comment: comment.comment }
  //       //     : { id, ...rest }
  //       // );
  //     } else {
  //       newPosts = posts?.map((el) => {
  //         if (postId === el.id) {
  //           return {
  //             ...el,
  //             comments: el.comments + 1,
  //           };
  //         } else return el;
  //       });
  //     }

  //     mutate(upsertCommentOnPost(postId, comment), {
  //       optimisticData: newPosts,
  //       populateCache: false,
  //       revalidate: false,
  //       rollbackOnError: true,
  //     });
  //   },
  //   [posts, mutate, upsertCommentOnPost],
  // );

  return { posts, isLoading, error, setLike, addPost, addCommentOnPost };
}
