import { getErrorMessage } from "../../utils/mock";

export default eventHandler(() => {
  function generateLineData(name: string) {
    const count = getRandomNumber(20, 2000);
    const value = Array.from({ length: 8 }).fill(0).map(() => getRandomNumber(800, 4000));

    return {
      name,
      count,
      value,
    };
  }

  function getRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  try {
    const xAxis = Array.from({ length: 8 }).fill(0).map((_item, index) => {
      return `12.1${index}`;
    });

    const data = [
      generateLineData("用户数"),
      generateLineData("总对话数"),
      generateLineData("被复制对话数"),
      generateLineData("点赞数"),
    ];

    return createSuccessResponse({ xAxis, data });
  } catch (error) {
    return createErrorResponse(getErrorMessage(error));
  }
});
