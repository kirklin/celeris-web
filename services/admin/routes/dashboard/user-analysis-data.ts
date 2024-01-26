import { getErrorMessage } from "../../utils/mock";

export default eventHandler(async (event) => {
  try {
    const { quota } = await readBody(event);

    const getLineData = () => {
      const xAxis = Array.from({ length: 12 }).fill(0).map((_item, index) => `${index + 1}日`);
      const data = {
        name: quota,
        value: Array.from({ length: 12 }).fill(0).map(() => getRandomNumber(1000, 3000)),
      };

      return { xAxis, data };
    };

    return createSuccessResponse({
      count: getRandomNumber(1000, 3000),
      growth: getRandomFloat(20, 100, 2),
      chartData: getLineData(),
    });
  } catch (error) {
    return createErrorResponse(getErrorMessage(error));
  }
});

function getRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomFloat(min: number, max: number, precision: number) {
  const randomFloat = Math.random() * (max - min) + min;
  return Number.parseFloat(randomFloat.toFixed(precision));
}
