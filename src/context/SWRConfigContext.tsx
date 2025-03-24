"use client";

import { SWRConfig } from "swr";

interface Props {
  children: React.ReactNode;
}

const SWRConfigContext = ({ children }: Props) => {
  return (
    <SWRConfig
      value={{
        fetcher: async (query: string) =>
          await fetch(query).then((res) => res.json()),
        // (resource, init) => fetch(resource, init).then((res) => res.json()),
        revalidateOnFocus: false, // SWR의 기본 설정은 탭을 이동했다 돌아오면 자동으로 다시 요청
      }}
    >
      {children}
    </SWRConfig>
  );
};

export default SWRConfigContext;
