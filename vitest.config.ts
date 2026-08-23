import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "./vite.config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: "jsdom", // fakes a DOM in Node so React can render
      setupFiles: "./src/test/setup.ts",
    },
  }),
);
