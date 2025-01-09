import type { Ref } from "vue";
import type { Assistant } from "~/pages/chat/components/AssistantSidebar/types";
import { createInjectionKey } from "@celeris/utils";

export interface ChatContextInjectionKey {
  selectedAssistantRef: Ref<Assistant>;
}

export const chatContextInjectionKey = createInjectionKey<ChatContextInjectionKey>("chatContext");
