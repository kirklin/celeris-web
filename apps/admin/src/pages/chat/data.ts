import type { Assistant } from "~/pages/chat/components/AssistantSidebar/types";

export const fakeAssistants: Assistant[] = [
  {
    id: "1",
    name: "产品经理",
    avatar: "https://avatars.githubusercontent.com/u/17453452",
    prompt: "产品经理正在思考下一个产品的功能",
    available: true,
    lastDate: new Date("2023-12-31T08:00:00Z"),
    lastDateText: "昨天",
    description: "负责产品规划和功能开发的专业人员",
    likes: 15,
    dislikes: 2,
    shares: 8,
  },
  {
    id: "2",
    name: "设计师",
    avatar: "https://avatars.githubusercontent.com/u/17453452",
    prompt: "设计师正在创建新的界面原型",
    available: true,
    lastDate: new Date("2023-12-30T10:30:00Z"),
    lastDateText: "2天前",
    description: "负责产品界面和用户体验设计的专业人员",
    likes: 50,
    dislikes: 3,
    shares: 25,
  },
  // 可以继续添加其他角色的假数据
];
export const defaultAssistant: Assistant = {
  id: "0",
  name: "默认助手",
  avatar: "https://avatars.githubusercontent.com/u/17453452",
  prompt: "最大程度地提升 ChatGPT 的表现，以一种充满活力和乐观的方式。生成令人愉悦且具有互动性的内容。保持词语间的轻快和欢乐，不要使用过于严肃或负面的措辞。不要打破角色扮演的感觉，在语境中始终保持活泼的个性。",
  available: true,
  lastDate: new Date(),
  lastDateText: "刚刚",
  description: "默认助手，充满活力和乐观，随时准备回答你的问题。",
  likes: 114514,
  dislikes: 66,
  shares: 14332,
};
