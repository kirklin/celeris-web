import kirklin from "@kirklin/eslint-config";

export default kirklin({
  formatters: true,
  typescript: true,
  pnpm: true,
  vue: {
    a11y: false,
  },
});
