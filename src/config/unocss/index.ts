import { defineConfig, presetAttributify, presetIcons, presetUno, transformerDirectives, transformerVariantGroup } from "unocss";
export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  variants: [
    //   Element样式穿透
    (matcher) => {
      // ca:[selector]style
      if (!matcher.startsWith("ca:")) {
        return matcher;
      }
      const sel = matcher.match(/\[(.*?)]/) || ["", "inject-selector-error"];

      return {
        matcher: matcher.slice(matcher.lastIndexOf("]") + 1),
        selector: () => `.${sel[1]}`,
      };
    },
  ],
  theme: {
    fontFamily: {
      "chinese": [
        "Helvetica Neue",
        "Helvetica",
        "Arial",
        "Microsoft Yahei",
        "Hiragino Sans GB",
        "Heiti SC",
        "WenQuanYi Micro Hei",
        "sans-serif",
      ],
      // 黑体
      "helvetica": [
        "-apple-system",
        "Noto Sans",
        "Helvetica Neue",
        "Helvetica",
        "Nimbus Sans L",
        "Arial",
        "Liberation Sans",
        "PingFang SC",
        "Hiragino Sans GB",
        "Noto Sans CJK SC",
        "Source Han Sans SC",
        "Source Han Sans CN",
        "Microsoft YaHei",
        "Wenquanyi Micro Hei",
        "WenQuanYi Zen Hei",
        "ST Heiti",
        "SimHei",
        "WenQuanYi Zen Hei Sharp",
        "sans-serif",
      ],
      // 楷体
      "italics": [
        "Baskerville",
        "Georgia",
        "Liberation Serif",
        "Kaiti SC",
        "STKaiti",
        "AR PL UKai CN",
        "AR PL UKai HK",
        "AR PL UKai TW",
        "AR PL UKai TW MBE",
        "AR PL KaitiM GB",
        "KaiTi",
        "KaiTi_GB2312",
        "DFKai-SB",
        "TW-Kai",
        "serif",
      ],
      // 宋体
      "song": [
        "Georgia",
        "Nimbus Roman No9 L",
        "Songti SC",
        "Noto Serif CJK SC",
        "Source Han Serif SC",
        "Source Han Serif CN",
        "STSong",
        "AR PL New Sung",
        "AR PL SungtiL GB",
        "NSimSun",
        "SimSun",
        "TW-Sung",
        "WenQuanYi Bitmap Song",
        "AR PL UMing CN",
        "AR PL UMing HK",
        "AR PL UMing TW",
        "AR PL UMing TW MBE",
        "PMingLiU",
        "MingLiU",
        "serif",
      ],
      // 仿宋体
      "imitation-song": [
        "Baskerville",
        "Times New Roman",
        "Liberation Serif",
        "STFangsong",
        "FangSong",
        "FangSong_GB2312",
        "CWTEX-F",
        "serif",
      ],
    },
    color: {
      primary: { 50: "#eff6ff", 100: "#dbeafe", 200: "#bfdbfe", 300: "#93c5fd", 400: "#60a5fa", 500: "#3b82f6", 600: "#2563eb", 700: "#1d4ed8", 800: "#1e40af", 900: "#1e3a8a" },
    },
  },
});
