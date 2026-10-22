import api from "@/provider/api";
import { API_ENDPOINTS } from "@/provider/endpoints";
import { queryClient } from "@/utils/queryClient";
import { showToast } from "@/utils/show-toast";
import { useCallback, useEffect, useState } from "react";
import { AskStatus } from "../../../types/ask";
import { useSSE } from "../use-sse";
import { appendAskMessage, refreshAskConversations } from "./ask-cache";

export interface AskAnswering {
  conversationId: string;
  status: AskStatus | null;
  text: string;
}

const FALLBACK_ERROR = "Heed couldn't answer that just now. Try again in a moment.";

// Keeps streaming when the user switches tabs: the screen stays mounted, and the server saves
// the answer even if the connection drops.
export const useAskAnswer = function () {
  const { connect, disconnect } = useSSE();
  const [answering, setAnswering] = useState<AskAnswering | null>(null);

  useEffect(() => disconnect, [disconnect]);

  const streamAnswer = useCallback(
    async function (conversationId: string) {
      setAnswering({ conversationId, status: null, text: "" });
      const conversationUrl = API_ENDPOINTS.ask.conversation(conversationId);

      // EventSource cannot refresh an expired access token; an axios call first can.
      await api.get(conversationUrl).catch(() => {});

      connect(API_ENDPOINTS.ask.answer(conversationId), {
        onEvent: (data) => {
          if (data.status) setAnswering((current) => current && { ...current, status: data.status });
        },
        onChunk: (_, full) => setAnswering((current) => current && { ...current, text: full }),
        onComplete: (data) => {
          if (data.message) appendAskMessage(data.message);
          setAnswering(null);
          refreshAskConversations();
        },
        // Every failure here can be retried, so none is shown as an error (product rule 7).
        onError: (message, code) => {
          setAnswering(null);
          showToast("warning", code ? message : FALLBACK_ERROR);
          queryClient.refetchQueries({ queryKey: [conversationUrl] });
        },
      });
    },
    [connect],
  );

  return { answering, streamAnswer };
};
