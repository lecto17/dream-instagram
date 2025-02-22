"use client";

import { client } from "@/sanity/sanity";
import { SWRConfig } from "swr";

interface Props {
  children: React.ReactNode;
}

const SWRConfigContext = ({ children }: Props) => {
  return (
    <SWRConfig
      value={{
        refreshInterval: 3000,
        fetcher: async (query: string) => await client.fetch(query),
        // (resource, init) => fetch(resource, init).then((res) => res.json()),
      }}
    >
      {children}
    </SWRConfig>
  );
};

export default SWRConfigContext;
