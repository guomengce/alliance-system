# Alliance System 重构计划

## 背景

当前项目是客户已确认的 Alliance System UI 原型，主要由 AI Studio 生成。项目包含客户端和管理端两个入口体验，但目前不是传统意义上的前后端分离完整项目。

现状特点：

- 前端技术栈：Vite + React + TypeScript + Tailwind CSS。
- 页面 UI 已经确认，视觉、布局、交互样式不能随意改动。
- 客户端和管理端代码都在同一个 React 项目中。
- 当前没有真实后端 API、数据库、鉴权接口或路由守卫。
- 业务数据主要来自本地 mock 数据和 React state。
- 多个页面组件体积较大，存在职责混杂、组件化不足的问题。

本次重构目标不是重做 UI，而是在保留现有 UI 的前提下，把项目整理成后续可多人协作、可接后端接口、可持续维护的 React 工程。

## 核心原则

1. UI 不变
   - 不主动改颜色、间距、布局、字体、动画和响应式效果。
   - 每次迁移或拆分后，都要确认页面视觉与原始版本一致。

2. 渐进式重构
   - 不一次性重写全项目。
   - 先搭工程骨架，再逐个页面迁移和拆分。
   - 每次改动范围尽量小，确保项目始终可运行。

3. 业务分区协作
   - 管理端和客户端分目录维护，降低多人协作冲突。
   - 公共代码放 shared/api/types 等公共区域，修改前需要沟通。

4. 先保留 mock，再接 API
   - 当前阶段可以继续使用本地 mock/state 保证 UI 和交互可运行。
   - 后续统一通过 api 层替换真实接口，避免页面组件直接调用后端。

## 目标目录结构

```txt
src/
  app/
    App.tsx
    providers/

  routes/
    AppRoutes.tsx
    AdminRoutes.tsx
    ClientRoutes.tsx

  layouts/
    AdminLayout/
    ClientLayout/

  features/
    admin/
      dashboard/
      users/
      plans/
      orders/
      commissions/
      queue/
      settlement/
      finance/
      parameters/
      broadcast/
      rbac/
      reports/
      logs/
      profile/

    client/
      home/
      member/
      wallet/
      subscribe/
      commission/
      team/
      queue/
      notifications/
      settings/

  shared/
    components/
    hooks/
    utils/
    constants/
    types/

  api/
    request.ts
    admin/
    client/

  mock/
    data.ts
```

说明：

- `features/admin`：管理端业务模块，当前由管理端负责人维护。
- `features/client`：客户端业务模块，当前由客户端负责人维护。
- `layouts`：管理端和客户端布局。
- `routes`：后续逐步引入 React Router 后的路由配置。
- `shared`：真正跨模块复用的组件、hook、工具和类型。
- `api`：统一接口层，后续和后端联调时优先改这里。
- `mock`：临时 mock 数据，后续逐步替换为真实接口。

## Git 分支规范

当前私人仓库建议使用：

```txt
main：保存稳定版本，尤其是原始 UI 基准和阶段性可交付版本。
dev：日常集成分支，两位前端同事都从这里拉功能分支。
```

功能分支命名：

```txt
refactor/admin-users
refactor/admin-orders
refactor/admin-finance
refactor/client-wallet
refactor/client-team
feat/admin-api-users
fix/login-flow
```

提交信息建议：

```txt
chore: initial ai studio ui import
chore: add refactor plan
refactor: move admin users into feature module
refactor: split admin users table
feat: add admin users api adapter
fix: keep admin tab after login
```

协作规则：

- 不直接在 `main` 开发。
- 日常从 `dev` 拉新分支。
- 一个分支只做一个明确目标。
- 合并前必须运行 `npm run build`。
- 避免两个人同时修改高冲突文件。

高冲突文件包括：

```txt
src/App.tsx
src/components/MainLayout.tsx
src/hooks/useAppState.ts
src/context/AppContext.tsx
src/types.ts
package.json
```

如需修改这些文件，先沟通再动。

## 两人分工建议

管理端负责人：

```txt
src/features/admin/**
src/layouts/AdminLayout/**
src/api/admin/**
```

客户端负责人：

```txt
src/features/client/**
src/layouts/ClientLayout/**
src/api/client/**
```

共同维护：

```txt
src/shared/**
src/routes/**
src/app/**
src/mock/**
src/types.ts 或 shared/types/**
```

共同维护区域改动前需要提前说明。

## 重构阶段

### 阶段 1：保存 UI 基准

目标：确保原始 UI 有可回退版本。

任务：

- 初始化 git。
- 提交原始 AI Studio 项目。
- 跑通 `npm install`、`npm run dev`、`npm run build`。
- 记录主要页面和管理端/客户端页面清单。

### 阶段 2：建立工程骨架

目标：先有清晰目录，不急于拆完所有页面。

任务：

- 创建 `features/admin`、`features/client`、`layouts`、`routes`、`shared`、`api`、`mock`。
- 先保持现有页面可运行。
- 不改变视觉样式。

### 阶段 3：管理端逐页迁移

建议顺序：

1. `AdminUsersView`
2. `AdminOrdersView`
3. `AdminFinanceView`
4. `AdminRbacView`
5. `AdminLogsView`

单个模块目标结构示例：

```txt
src/features/admin/users/
  index.tsx
  hooks/
    useAdminUsers.ts
  components/
    AdminUserTable.tsx
    AdminUserFilters.tsx
    AdminUserEditModal.tsx
    AdminUserStatusTag.tsx
  types.ts
```

迁移步骤：

1. 先把旧页面移动到模块入口，保证 UI 不变。
2. 再从页面内部拆 hook 和 components。
3. 最后接 api 层。

### 阶段 4：客户端逐页迁移

建议顺序：

1. `WalletView`
2. `SubscribeView`
3. `QueueView`
4. `TeamView`
5. `SettingsView`

客户端负责人按同样方式拆：

```txt
src/features/client/wallet/
  index.tsx
  hooks/
  components/
  types.ts
```

### 阶段 5：接后端接口

目标：页面不直接依赖 mock/state，逐步通过 api 层拿数据。

示例：

```txt
src/api/admin/users.ts
src/api/admin/orders.ts
src/api/admin/finance.ts
src/api/client/wallet.ts
src/api/client/team.ts
```

页面调用流程目标：

```txt
页面 index.tsx
  -> feature hook
  -> api module
  -> request.ts
  -> 后端接口
```

## 当前优先事项

短期只做这些：

1. 保留原始 UI 基准。
2. 建立文档和目录结构。
3. 选择一个管理端页面做样板模块。
4. 构建通过。
5. 总结样板模块拆分规则，后续复制到其他页面。

不建议当前阶段做：

- 全项目重写。
- 大面积改 UI。
- 一次拆完所有大组件。
- 提前引入复杂全局状态库。
- 在后端接口未确定前强行写死接口字段。

## 管理端样板模块建议

建议先从 `AdminUsersView` 开始，因为它典型且高频：

- 有列表。
- 有筛选。
- 有编辑状态。
- 有用户详情。
- 有管理端业务逻辑。

拆完后形成模板，再处理订单、财务、权限等模块。
