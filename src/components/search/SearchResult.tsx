import SearchUserAvatar from "@/components/search/SearchUserAvatar";
import GridSpinner from "@/components/spinner/GridSpinner";
import { LOADING_BAR_COLOR } from "@/constants/color";
import { SearchUser } from "@/types/user";
import useSWR from "swr";

type Props = {
  text?: string;
};
const SearchResult = ({ text }: Props) => {
  const { data: users, isLoading } = useSWR<SearchUser[]>(
    `/api/search/${text}`
  );

  return (
    <>
      {isLoading && (
        <div className="w-full flex justify-center mt-32">
          <GridSpinner color={LOADING_BAR_COLOR} />
        </div>
      )}
      <ul>
        {users?.map((user, idx) => (
          <SearchUserAvatar user={user} key={user.name + "-" + idx} />
        ))}
        {text && !isLoading && !users?.length && (
          <div className="w-full flex justify-center mt-32">
            검색한 사용자가 존재하지 않습니다.🥲
          </div>
        )}
      </ul>
    </>
  );
};

export default SearchResult;
