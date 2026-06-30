# Findings: Antd Override Split

## Initial Findings
- `src/shared/antd/overrides.css` is about 3942 lines and currently mixes base Antd component styling, reusable utility variants, and page/module-specific skins.
- Many selectors are prefixed by module names such as `commission`, `finance`, `queue`, `logs`, `settlement`, `wallet`, `subscribe`, `settings`, and `plan`.
- Existing unrelated worktree changes exist in `src/features/auth/utils.test.ts` and `src/hooks/useAuthState.ts`; avoid touching them.
- Moved first-pass unambiguous module prefixes out of global CSS: `finance`, `logs`, `settlement`, `plan`, `broadcast`, `report`, `dashboard`, `admin-user-detail`, `wallet`, `subscribe`, `settings`, `notification`, `home`, `member`, and `team`.
- Moved `commission-*` into `src/features/shared/antd/commission-overrides.css`, imported by admin and client commission pages.
- Moved `queue-*` into `src/features/shared/antd/queue-overrides.css`, imported by admin queue, client queue, and client team because team uses `alliance-antd-queue-search`.
- Left general shared prefixes in global CSS for now, especially `admin-*`, `table`, `tag`, `button`, `form`, and `modal`.
