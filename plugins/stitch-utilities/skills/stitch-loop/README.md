# Stitch Build Loop Skill

Teaches agents to iteratively build websites using Stitch with an autonomous baton-passing loop pattern.

## Install

```bash
npx skills add google-labs-code/stitch-skills --skill stitch-loop --global
```

## What It Does

Enables continuous, autonomous website development through a "baton" system:

1. Agent reads task from `next-prompt.md`
2. Generates page via Stitch MCP tools
3. Integrates into site structure
4. Writes next task to continue the loop

## Prerequisites

- Stitch MCP Server access
- A `DESIGN.md` file (generate with the `design-md` skill)
- A `SITE.md` file for project context

## Example Prompt

```text
Read my next-prompt.md and generate the page using Stitch, then prepare the next iteration.
```

## Skill Structure

```
stitch-loop/
â”œâ”€â”€ SKILL.md              â€” Core pattern instructions
â”œâ”€â”€ README.md             â€” This file
â”œâ”€â”€ resources/
â”‚   â”œâ”€â”€ baton-schema.md   â€” Baton file format spec
â”‚   â””â”€â”€ site-template.md  â€” SITE.md/DESIGN.md templates
â””â”€â”€ examples/
    â”œâ”€â”€ next-prompt.md    â€” Example baton
    â””â”€â”€ SITE.md           â€” Example site constitution
```

## Works With

- **`design-md` skill**: Generate `DESIGN.md` from existing Stitch screens
- **CI/CD**: GitHub Actions can trigger new iterations on push
- **Agent chains**: Dispatch to other agents (Jules, etc.)

## Learn More

See [SKILL.md](./SKILL.md) for complete instructions.
