import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    alias: {
      "react-native": "./__mocks__/react-native.ts",
      "expo-sqlite": "./__mocks__/expo-sqlite.ts",
    },
  },
});
