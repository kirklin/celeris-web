import type { Ref } from "vue";
import { createInjectionKey } from "@celeris/utils";
import type { Assistant } from "~/pages/chat/components/AssistantSidebar/types";

export interface ChatContextInjectionKey {
  selectedAssistantRef: Ref<Assistant>;
}

export const chatContextInjectionKey = createInjectionKey<ChatContextInjectionKey>("chatContext");
