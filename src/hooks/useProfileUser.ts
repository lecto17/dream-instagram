import { UserProfile } from "@/types/user";
import useSWR from "swr";

export default function useProfileUser(username: string) {
  const { data: profileUser, isLoading } = useSWR<UserProfile>(
    `/api/users/${username}`
  );

  return { profileUser, isLoading };
}
