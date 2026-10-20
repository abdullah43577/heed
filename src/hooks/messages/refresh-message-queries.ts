import { queryClient } from "@/utils/queryClient";

const MESSAGE_LIST_PREFIXES = ["/messages", "/backlog", "/reports/"];

// Message lists are keyed by their full url (including ?since=), so they are refreshed by prefix.
// A backlog summary and a report detail list messages too, so an action on one refreshes them.
export const refreshMessageQueries = function () {
  return queryClient.refetchQueries({
    predicate: (query) => MESSAGE_LIST_PREFIXES.some((prefix) => String(query.queryKey[0]).startsWith(prefix)),
  });
};
