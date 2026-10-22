import { AppText } from "@/components/shared/app-text";
import { formatRelativeDate } from "@/utils/format-date";
import { useState } from "react";
import { Pressable, View } from "react-native";
import { ThreadMessage } from "../../../../types/draft";

interface Props {
  subject: string;
  thread: ThreadMessage[];
}

const senderLabel = (message: ThreadMessage) => (message.fromMe ? "You" : message.from.replace(/\s*<[^>]+>\s*$/, "") || message.from);

const ThreadItem = function ({ message, collapsed }: { message: ThreadMessage; collapsed: boolean }) {
  return (
    <View className="px-4 py-3.5">
      <View className="flex-row items-center gap-2">
        <AppText type="label" numberOfLines={1} className="flex-1">
          {senderLabel(message)}
        </AppText>
        <AppText type="caption">{formatRelativeDate(message.sentAt)}</AppText>
      </View>
      <AppText type={collapsed ? "subtitle" : "body"} numberOfLines={collapsed ? 2 : undefined} className="mt-1" selectable>
        {message.bodyText || "(no text)"}
      </AppText>
    </View>
  );
};

// The email being answered in full, with anything earlier folded away above it.
export const DraftThread = function ({ subject, thread }: Props) {
  const [showEarlier, setShowEarlier] = useState(false);
  const latest = thread.at(-1);
  const earlier = thread.slice(0, -1);

  return (
    <View>
      <AppText type="label" className="mb-2">
        {subject}
      </AppText>

      <View className="overflow-hidden rounded-xl border-hairline border-line bg-surface">
        {earlier.length > 0 && !showEarlier && (
          <Pressable onPress={() => setShowEarlier(true)} className="border-b-hairline border-line px-4 py-3 active:bg-surface-muted">
            <AppText type="link">
              Show {earlier.length} earlier {earlier.length === 1 ? "message" : "messages"}
            </AppText>
          </Pressable>
        )}

        {showEarlier &&
          earlier.map((message) => (
            <View key={message.gmailMessageId} className="border-b-hairline border-line">
              <ThreadItem message={message} collapsed />
            </View>
          ))}

        {latest ? (
          <ThreadItem message={latest} collapsed={false} />
        ) : (
          <AppText type="subtitle" className="px-4 py-3.5">
            {"Heed couldn't load this email from Gmail right now."}
          </AppText>
        )}
      </View>
    </View>
  );
};
