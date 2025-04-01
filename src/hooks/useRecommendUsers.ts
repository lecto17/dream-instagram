import { SimpleUser } from "@/types/user";
import useSWR from "swr";

export default function useRecommendUsers() {
  const { data: recommendUsers, isLoading } = useSWR<SimpleUser[]>(
    "/api/recommend/users"
  );

  return { recommendUsers, isLoading };
}
