import { queryClient } from "@/utils/queryClient";

// Rule lists are keyed by their full url (including ?mailAccountId=), so they are refreshed by prefix.
export const refreshRuleQueries = function () {
  return queryClient.refetchQueries({ predicate: (query) => String(query.queryKey[0]).startsWith("/rules") });
};
