import { createContext, useContext } from "react";

type CacheKeysValue = {
  postsKey: string;
};

const CacheKeyContext = createContext<CacheKeysValue>({
  postsKey: "/api/posts",
});

export const useCacheKeyContext = () => useContext(CacheKeyContext);
export default CacheKeyContext;
