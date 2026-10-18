import { queryClient } from "@/utils/queryClient";

// Message lists are keyed by their full url (including ?since=), so they are refreshed by prefix.
export const refreshMessageQueries = function () {
  return queryClient.refetchQueries({
    predicate: (query) => String(query.queryKey[0]).startsWith("/messages"),
  });
};
