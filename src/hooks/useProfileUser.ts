import { UserProfile } from "@/types/user";
import useSWR from "swr";

export default function useProfileUser(username: string, callFlag?: unknown) {
  const { data: profileUser, isLoading } = useSWR<UserProfile>(
    `/api/users/${username}`
  );
  console.log(callFlag);

  return { profileUser, isLoading };
}
