import { useParams, useSearchParams } from 'next/navigation';

type ParamsType = 'queryParams' | 'queryString';
type KeyType = 'date' | 'channelId';

export default function useGetUrlParams(paramsType: ParamsType, key: KeyType) {
  if (paramsType === 'queryParams') {
    const params = useParams();
    const data = params[key];

    return { data };
  } else if (paramsType === 'queryString') {
    const searchParams = useSearchParams();
    const data = searchParams.get(key);

    return { data };
  }
}
