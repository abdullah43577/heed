import * as Haptics from "expo-haptics";
import { useState } from "react";
import { EmailMessage } from "../../../types/email-message";
import { useSenderRuleActions } from "./use-sender-rule-actions";

// The long-press on a sender in Handled or Review: one sheet, prefilled from the email.
// The last email is kept after closing so the sheet can animate out instead of vanishing.
export const useSenderRuleSheet = function () {
  const [message, setMessage] = useState<EmailMessage | null>(null);
  const [visible, setVisible] = useState(false);
  const { saveRule, isSavingRule } = useSenderRuleActions({ onSaved: () => setVisible(false) });

  const openFor = function (next: EmailMessage) {
    Haptics.selectionAsync().catch(() => {});
    setMessage(next);
    setVisible(true);
  };

  return {
    openFor,
    sheetProps: message
      ? {
          visible,
          onClose: () => setVisible(false),
          onSave: saveRule,
          isSaving: isSavingRule,
          mailAccountId: message.mailAccount.id,
          accountEmail: message.mailAccount.email,
          senderEmail: message.fromEmail,
          defaultAllAccounts: true,
        }
      : null,
  };
};
