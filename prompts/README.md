# Prompts

This folder contains copy-paste prompt templates for coding agents (Codex, Claude Code, etc.)
to generate repo documentation in a consistent, CI-safe way.

## How to use

1. Open the prompt you need:
   - `generate-root-agentsmd.prompt.md` (creates `/AGENTS.md`)
   - `generate-workspace-agentsmd.prompt.md` (creates `<TARGET>/AGENTS.md`)

2. Copy the full prompt into your coding agent.

3. For workspace prompts, replace:
   - `<PASTE ONE PATH HERE>` with a single workspace path (example: `apps/landing`)
   - `<TARGET>` with the same path if your agent needs it

## Conventions

- Prompts are **documentation-only** by default (no refactors, no new tooling).
- Prompts must stay **public-safe** (no secrets, tokens, internal URLs).
- Workspace prompts are **delta-only**: they must not duplicate `/AGENTS.md`.
