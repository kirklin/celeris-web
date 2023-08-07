export interface ChatGPTDemoTableRow {
  id: number;
  userInput: string;
  expectedReply: string;
  isTestPassed: boolean;
}

export const chatGPTDemoTestData: ChatGPTDemoTableRow[] = [
  {
    id: 1,
    userInput: "你好，能告诉我今天的天气吗？",
    expectedReply: "ChatGPT生成适当的天气预报回复",
    isTestPassed: true,
  },
  {
    id: 2,
    userInput: "请为我讲一个幽默笑话。",
    expectedReply: "ChatGPT生成幽默笑话回复",
    isTestPassed: true,
  },
  {
    id: 3,
    userInput: "翻译 \"hello\" 成法语。",
    expectedReply: "ChatGPT生成合理的法语翻译",
    isTestPassed: true,
  },
  {
    id: 4,
    userInput: "帮我制定一个减肥计划。",
    expectedReply: "ChatGPT生成关于减肥计划的建议",
    isTestPassed: true,
  },
  {
    id: 5,
    userInput: "解释一下人工智能的概念。",
    expectedReply: "ChatGPT生成关于人工智能的解释",
    isTestPassed: true,
  },
  {
    id: 6,
    userInput: "给我推荐一本好看的小说。",
    expectedReply: "ChatGPT生成推荐的小说书目",
    isTestPassed: true,
  },
  {
    id: 7,
    userInput: "为什么天空是蓝色的？",
    expectedReply: "ChatGPT生成关于天空颜色的科学解释",
    isTestPassed: true,
  },
  {
    id: 8,
    userInput: "如何备份我的电脑文件？",
    expectedReply: "ChatGPT生成关于备份方法的建议",
    isTestPassed: true,
  },
  {
    id: 9,
    userInput: "告诉我一些做饭的窍门。",
    expectedReply: "ChatGPT生成烹饪技巧和建议",
    isTestPassed: true,
  },
  {
    id: 10,
    userInput: "你有兴趣爱好吗？",
    expectedReply: "ChatGPT生成关于自己兴趣的回复",
    isTestPassed: false,
  },
];
