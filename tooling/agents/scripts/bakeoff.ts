#!/usr/bin/env npx tsx
/**
 * Simple bakeoff - Run Claude + Codex in parallel via tmux.
 *
 * Usage: pnpm agents:bakeoff
 */
import { existsSync, writeFileSync } from "node:fs";
import path from "node:path";
import { $, question } from "zx";

// 1. Get task interactively
const task = await question("Enter the bakeoff task: ");
if (!task.trim()) {
  console.error("No task provided.");
  process.exit(1);
}

// 2. Generate run ID
const runId = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
const agents = [
  "claude",
  // "codex"
];

// 3. Create worktrees
for (const agent of agents) {
  const branch = `agents/${agent}/${runId}`;
  const dir = `.worktrees/${agent}`;

  if (existsSync(dir)) {
    console.error(`${dir} exists. Run: pnpm agents:bakeoff:clean`);
    process.exit(1);
  }

  await $`git worktree add -b ${branch} ${dir}`;
  writeFileSync(path.join(dir, ".agent-task.md"), `# Task\n\n${task.trim()}\n`);
  console.log(`Created: ${dir} (${branch})`);
}

// 4. Launch tmux with 2 panes
const session = `bakeoff-${runId}`;
const claudeDir = path.resolve(".worktrees/claude");
const codexDir = path.resolve(".worktrees/codex");

await $`tmux new-session -d -s ${session} -c ${claudeDir}`;
await $`tmux send-keys -t ${session} ${'claude "' + task.trim() + '"'} Enter`;
await $`tmux split-window -h -t ${session} -c ${codexDir}`;
await $`tmux send-keys -t ${session} 'codex' Enter`;

console.log(`\nTmux session created: ${session}`);
console.log(`Attach with: tmux attach -t ${session}`);
