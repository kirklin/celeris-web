import kirklin from "@kirklin/eslint-config";

export default kirklin({
  rules: {
    "new-cap": "warn",
    "unused-imports/no-unused-vars": "warn",
    "ts/no-unused-expressions": "warn",
  },
  formatters: {
    /**
     * 格式化CSS、LESS、SCSS文件，以及Vue中的`<style>`块
     * 默认情况下使用Prettier
     */
    css: true,
    /**
     * 格式化HTML文件
     * 默认情况下使用Prettier
     */
    html: true,
    /**
     * 格式化Markdown文件
     * 支持Prettier和dprint
     * 默认情况下使用Prettier
     */
    markdown: "prettier",
  },
});
