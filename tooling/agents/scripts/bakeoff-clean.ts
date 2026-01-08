#!/usr/bin/env npx tsx
/**
 * Cleanup bakeoff worktrees and branches.
 *
 * Usage: pnpm agents:bakeoff:clean
 */
import { existsSync, rmSync } from "node:fs";
import { $ } from "zx";

const agents = ["claude", "codex"];

for (const agent of agents) {
  const dir = `.worktrees/${agent}`;
  if (!existsSync(dir)) continue;

  // Find branch from git worktree list
  const result = await $`git worktree list --porcelain`.nothrow();
  const regex = new RegExp(`branch refs/heads/(agents/${agent}/[^\\n]+)`);
  const match = result.stdout.match(regex);
  const branch = match?.[1];

  // Remove worktree
  await $`git worktree remove --force ${dir}`.nothrow();
  if (existsSync(dir)) rmSync(dir, { recursive: true });

  // Remove branch
  if (branch) await $`git branch -D ${branch}`.nothrow();

  console.log(`Cleaned: ${agent}`);
}

console.log("Done.");
