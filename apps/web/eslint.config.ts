import { defineConfig } from "eslint/config";

import { baseConfig } from "@turborepo-agents/eslint/base";
import { nextjsConfig } from "@turborepo-agents/eslint/nextjs";
import { reactConfig } from "@turborepo-agents/eslint/react";

export default defineConfig(
  {
    ignores: [".next/**"],
  },
  baseConfig,
  reactConfig,
  nextjsConfig
);
