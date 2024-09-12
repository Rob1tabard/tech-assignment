import useSWR from "swr";

//types
import type { SWRConfiguration } from "swr";
import type { ChildrenDataType } from "@/utils/swr/useGetChildrenData/type";

//lib
import { GET_CHILDREN } from "@/lib/apiEndpoints";

const getChildrenParams = {
  accessToken: import.meta.env.VITE_API_ACCESS_TOKEN,
  groupId: "86413ecf-01a1-44da-ba73-1aeda212a196",
  institutionId: "dc4bd858-9e9c-4df7-9386-0d91e42280eb",
};

const queryString = new URLSearchParams(getChildrenParams).toString();

export function useGetChildrenData(
  options?: SWRConfiguration<ChildrenDataType, Error>
) {
  const {
    data: childrenData,
    mutate: mutateChildrenData,
    error: childrenDataError,
    isLoading,
  } = useSWR<ChildrenDataType, Error>(
    `${GET_CHILDREN}?${queryString}`,
    (url) =>
      fetch(url, {
        method: "GET",
      }).then(async (res) => {
        /* await response */
        const response = await res.json();

        return response.children;
      }),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      ...options,
    }
  );

  return {
    childrenData,
    mutateChildrenData,
    childrenDataError,
    isLoading,
  };
}
