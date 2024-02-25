import { faker } from "@faker-js/faker";

// Generate a fake completion using faker
export const fakeCompletion = {
  id: faker.string.uuid(),
  object: "text_completion",
  created: faker.date.soon,
  model: "celeris-mock",
  choices: [
    {
      text: faker.lorem.sentence({ min: 3, max: 300 }),
      logprobs: null,
      finish_reason: "length",
      index: 0,
    },
  ],
  usage: {
    prompt_tokens: 10,
    completion_tokens: 20,
    total_tokens: 30,
  },
};
