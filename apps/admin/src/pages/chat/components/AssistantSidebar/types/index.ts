/**
 * Interface representing a chat assistant.
 * 表示一个聊天助手的接口。
 */
export interface Assistant {
  /**
   * Unique identifier for the assistant.
   * 聊天助手的唯一标识符。
   */
  id: string;

  /**
   * Name of the assistant.
   * 聊天助手的名称。
   */
  name: string;

  /**
   * URL of the assistant's avatar image.
   * 聊天助手头像的 URL。
   */
  avatar: string;

  /**
   * Prompt or introductory message for the assistant.
   * 聊天助手的提示或介绍性消息。
   */
  prompt: string;

  /**
   * Availability status of the assistant.
   * 聊天助手的可用性状态。
   */
  available: boolean;

  /**
   * Date when the assistant was last active.
   * 聊天助手上次活动的日期。
   */
  lastDate: Date;

  /**
   * Text representation of the last active date.
   * 上次活动日期的文本表示。
   */
  lastDateText: string;

  /**
   * Description or bio of the assistant.
   * 聊天助手的描述或简介。
   */
  description: string;

  /**
   * Number of likes received by the assistant.
   * 聊天助手收到的点赞数。
   */
  likes?: number;

  /**
   * Number of dislikes received by the assistant.
   * 聊天助手收到的踩数。
   */
  dislikes?: number;

  /**
   * Number of shares for the assistant.
   * 聊天助手的分享数。
   */
  shares?: number;
}

/**
 * Interface representing summary information of a chat session.
 * 表示聊天会话摘要信息的接口。
 */
export interface ChatSummary {
  /**
   * Unique identifier for the chat summary.
   * 聊天摘要的唯一标识符。
   */
  id: string;

  /**
   * ID of the associated chat assistant.
   * 相关联的聊天助手的 ID。
   */
  assistantId: string;

  /**
   * Title or summary of the chat session.
   * 聊天会话的标题或摘要。
   */
  title: string;

  /**
   * Indicates whether the chat session is archived.
   * 表示聊天会话是否已归档。
   */
  archived: boolean;
}

/**
 * Interface representing the sidebar content for chat history.
 * 表示聊天历史侧边栏内容的接口。
 */
export interface ChatHistorySidebar {
  /**
   * ID of the associated chat assistant.
   * 相关联的聊天助手的 ID。
   */
  assistantId: string;

  /**
   * List of chat summaries displayed in the sidebar.
   * 显示在侧边栏中的聊天摘要列表。
   */
  chatSummaries: ChatSummary[];
}
