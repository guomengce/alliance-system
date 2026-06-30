# Task Plan: Split Antd Page Overrides

## Goal
Move page/module-specific Ant Design override CSS out of `src/shared/antd/overrides.css` and into CSS files colocated with the corresponding feature modules. Keep global overrides for shared/base component styling only.

## Phases
- [complete] Audit override sections and classify shared vs module-specific selectors.
- [complete] Move a first set of clearly module-specific admin/client sections into feature CSS files and import them from module entry points.
- [complete] Leave shared/base styles in `src/shared/antd/overrides.css`.
- [complete] Run TypeScript/build verification if allowed by the environment.

## Scope Notes
- Do not touch unrelated auth changes currently present in the worktree.
- Prefer mechanical CSS moves without changing selector bodies.
- The user specifically wants page-specific styles removed from global CSS as a first step.
- `commission-*` and `queue-*` are cross-surface feature styles; keep them out of global CSS and import shared feature CSS from both admin and client modules.

## Errors Encountered
- Verification commands may need elevated permissions because prior `npm run lint` hit `EPERM` reading `C:\Users\test`.
- `npm run lint` failed in sandbox with `EPERM: operation not permitted, lstat 'C:\Users\test'`; reran with approved escalation and it passed.
