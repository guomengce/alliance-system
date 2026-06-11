# AdminUsers 模块拆分执行指南

## 给执行 AI 的任务说明

你将重构 `Alliance System` 项目的管理端用户模块。

当前项目是客户已确认的 UI 原型，UI 不能改。你的任务不是重新设计页面，而是在保持视觉和交互尽量不变的前提下，把 `AdminUsers` 页面拆成更符合 React 工程化和组件化标准的模块。

请严格按照本文档执行。

## 项目背景

当前管理端用户页面入口：

```txt
src/features/admin/users/index.tsx
```

旧文件仍保留在：

```txt
src/components/AdminUsersView.tsx
```

旧文件仅作为 UI 对照，不应继续作为运行入口。

当前 `MainLayout` 已经引用新入口：

```txt
src/features/admin/users/index.tsx
```

项目技术栈：

```txt
Vite
React 19
TypeScript
Tailwind CSS
lucide-react
motion
Context + useState
```

全局类型在：

```txt
src/types.ts
```

admin users 模块已有：

```txt
src/features/admin/users/index.tsx
src/features/admin/users/types.ts
src/features/admin/users/utils.ts
```

`@` 别名已配置，可使用：

```ts
import { DownlineMember } from '@/src/types'
```

## 最高优先级原则

### 1. UI 不允许主动改动

客户已确认 UI，重构时不要主动改变：

- 颜色
- 间距
- 字体大小
- 圆角
- 边框
- 阴影
- hover 效果
- 动画 class
- 响应式断点
- 文案
- 图标
- 布局层级

拆组件时应尽量原样搬运 JSX 和 className。

### 2. 一次只拆一个清晰边界

不要一次性大改整个页面。

推荐按本文档顺序拆：

1. `AdminUsersToolbar`
2. `AdminUsersList`
3. `AdminUserMobileCard`
4. `AdminUserDesktopTable`
5. `AdminUserDetailsPanel`
6. 再考虑拆详情面板内部 tabs
7. 最后考虑抽 hook

每拆完一阶段必须构建验证。

### 3. 保持行为不变

现有功能必须保留：

- 搜索用户
- KYC 筛选
- 移动端卡片列表
- 桌面端表格列表
- 点击“查看”进入用户详情编辑面板
- KYC 快速审核
- 编辑用户资料、钱包、团队信息
- 保存后更新 downlines
- 返回用户列表

### 4. 不接真实接口

本次只做结构拆分，不接后端 API，不改数据来源。

当前数据仍来自 props：

```ts
interface AdminUsersViewProps {
  downlines: DownlineMember[];
  onUpdateDownlines: (members: DownlineMember[]) => void;
}
```

不要新增 axios/fetch/request。

## 目标目录结构

最终建议结构：

```txt
src/features/admin/users/
  index.tsx
  types.ts
  utils.ts
  components/
    AdminUsersToolbar.tsx
    AdminUsersList.tsx
    AdminUserMobileCard.tsx
    AdminUserDesktopTable.tsx
    AdminUserDetailsPanel.tsx
```

如果详情面板过大，可以进一步拆：

```txt
src/features/admin/users/components/details/
  AdminUserDetailsHeader.tsx
  AdminUserDetailsTabs.tsx
  AdminUserProfileTab.tsx
  AdminUserWalletTab.tsx
  AdminUserTeamTab.tsx
  AdminUserDetailsActions.tsx
```

但请不要一开始就深拆详情面板。先完成第一层组件拆分。

## 当前已有类型

请优先复用 `src/features/admin/users/types.ts`。

已有类型包括：

```ts
export type KycFilter = 'all' | 'pending' | 'verified';
export type AdminUserTab = 'profile' | 'wallet' | 'team';
export type UserAccountStatus = 'normal' | 'frozen' | 'disabled';
export type KycL1Status = 'verified' | 'unverified';
export type KycL2Status = 'verified' | 'pending' | 'unverified';

export interface AdminUsersViewProps {
  downlines: DownlineMember[];
  onUpdateDownlines: (members: DownlineMember[]) => void;
}
```

如需新增 props 类型，请放在 `types.ts` 或组件文件顶部。若只被单个组件使用，可以先放组件文件内。

## 当前已有工具函数

请复用：

```txt
src/features/admin/users/utils.ts
```

已有：

```ts
filterAdminUsers(downlines, searchText, kycFilter)
```

不要在移动端和桌面端重复写相同筛选逻辑。

## 拆分阶段说明

### 阶段 1：拆 AdminUsersToolbar

从 `index.tsx` 正常列表视图中抽出顶部区域：

- 标题“用户列表”
- 说明文字
- 搜索输入框
- KYC 筛选 select

目标文件：

```txt
src/features/admin/users/components/AdminUsersToolbar.tsx
```

推荐 props：

```ts
interface AdminUsersToolbarProps {
  searchText: string;
  kycFilter: KycFilter;
  onSearchTextChange: (value: string) => void;
  onKycFilterChange: (value: KycFilter) => void;
}
```

父组件使用：

```tsx
<AdminUsersToolbar
  searchText={userSearchText}
  kycFilter={kycFilter}
  onSearchTextChange={setUserSearchText}
  onKycFilterChange={setKycFilter}
/>
```

注意：

- 保留原 className。
- 保留 `Search` 和 `Users` 图标。
- 不改文案。

### 阶段 2：拆 AdminUsersList

抽出正常列表视图整体容器。

目标文件：

```txt
src/features/admin/users/components/AdminUsersList.tsx
```

它负责组合：

- `AdminUsersToolbar`
- 移动端卡片列表
- 桌面端表格

推荐 props：

```ts
interface AdminUsersListProps {
  downlines: DownlineMember[];
  searchText: string;
  kycFilter: KycFilter;
  onSearchTextChange: (value: string) => void;
  onKycFilterChange: (value: KycFilter) => void;
  onStartEditing: (user: DownlineMember) => void;
  onKycAudit: (uid: string, accept: boolean) => void;
}
```

`AdminUsersList` 内部可以调用：

```ts
const filteredDownlines = filterAdminUsers(downlines, searchText, kycFilter)
```

也可以由父组件传入 `filteredDownlines`。

推荐让 `AdminUsersList` 内部调用 `filterAdminUsers`，这样 `index.tsx` 更像页面状态入口。

### 阶段 3：拆 AdminUserMobileCard

目标文件：

```txt
src/features/admin/users/components/AdminUserMobileCard.tsx
```

从移动端 `.map(d => (...))` 中抽出单个用户卡片。

推荐 props：

```ts
interface AdminUserMobileCardProps {
  user: DownlineMember;
  onStartEditing: (user: DownlineMember) => void;
  onKycAudit: (uid: string, accept: boolean) => void;
}
```

父级使用：

```tsx
{filteredDownlines.map(user => (
  <AdminUserMobileCard
    key={user.uid}
    user={user}
    onStartEditing={onStartEditing}
    onKycAudit={onKycAudit}
  />
))}
```

注意：

- 不改移动端卡片样式。
- 不改“查看”“批准”等按钮行为。

### 阶段 4：拆 AdminUserDesktopTable

目标文件：

```txt
src/features/admin/users/components/AdminUserDesktopTable.tsx
```

从桌面 `<table>` 区域抽出。

推荐 props：

```ts
interface AdminUserDesktopTableProps {
  users: DownlineMember[];
  onStartEditing: (user: DownlineMember) => void;
  onKycAudit: (uid: string, accept: boolean) => void;
}
```

父级使用：

```tsx
<AdminUserDesktopTable
  users={filteredDownlines}
  onStartEditing={onStartEditing}
  onKycAudit={onKycAudit}
/>
```

注意：

- 表头、列顺序、样式、KYC 状态展示保持不变。
- 不要引入 Ant Design Table。本项目当前 UI 是 Tailwind 手写 table，必须保持视觉一致。

### 阶段 5：拆 AdminUserDetailsPanel

目标文件：

```txt
src/features/admin/users/components/AdminUserDetailsPanel.tsx
```

当 `editingUser` 有值时，页面显示详情编辑面板。

当前详情面板非常大，第一轮可以整体搬出，不要深拆内部 tabs。

推荐 props 会比较多，可以先接受一个聚合对象，避免 props 过长。

示例：

```ts
interface AdminUserDetailsPanelProps {
  editingUser: DownlineMember;
  activeTab: AdminUserTab;
  setActiveTab: (tab: AdminUserTab) => void;
  teamSearchText: string;
  setTeamSearchText: (value: string) => void;
  formState: AdminUserFormState;
  formActions: AdminUserFormActions;
  onCancel: () => void;
  onSave: () => void;
}
```

可以在 `types.ts` 中新增：

```ts
export interface AdminUserFormState {
  formNickname: string;
  formEmail: string;
  formPhone: string;
  formSponsor: string;
  formPassword: string;
  formStatus: UserAccountStatus;
  formRegDate: string;
  formTier: string;
  formUsdt: number;
  formFrozenUsdt: number;
  formTroo: number;
  formPending: number;
  formNodes: number;
  formVolume: number;
  formKycL1: KycL1Status;
  formKycL2: KycL2Status;
}

export interface AdminUserFormActions {
  setFormNickname: (value: string) => void;
  setFormEmail: (value: string) => void;
  setFormPhone: (value: string) => void;
  setFormSponsor: (value: string) => void;
  setFormPassword: (value: string) => void;
  setFormStatus: (value: UserAccountStatus) => void;
  setFormRegDate: (value: string) => void;
  setFormTier: (value: string) => void;
  setFormUsdt: (value: number) => void;
  setFormFrozenUsdt: (value: number) => void;
  setFormTroo: (value: number) => void;
  setFormPending: (value: number) => void;
  setFormNodes: (value: number) => void;
  setFormVolume: (value: number) => void;
  setFormKycL1: (value: KycL1Status) => void;
  setFormKycL2: (value: KycL2Status) => void;
}
```

如果 props 太复杂，不要强行一次拆完。可以先拆前四个组件，详情面板留在 `index.tsx`，后续再处理。

## index.tsx 最终职责

拆完第一轮后，`index.tsx` 应该主要负责：

- 接收 `downlines` 和 `onUpdateDownlines`。
- 管理页面状态：搜索、筛选、当前编辑用户、详情 tab、表单 state。
- 定义业务事件：开始编辑、保存、KYC 审核、取消编辑。
- 根据 `editingUser` 判断显示列表还是详情面板。
- 组合子组件。

`index.tsx` 不应该继续包含：

- 大段移动端卡片 JSX。
- 大段桌面表格 JSX。
- 顶部 toolbar JSX。
- 重复筛选逻辑。

## 验收标准

拆完后必须满足：

1. 构建通过

```bash
pnpm build
```

2. 页面行为不变

请手动检查：

- 登录管理端。
- 打开“用户管理”。
- 搜索昵称、邮箱、UID 能过滤。
- KYC 下拉筛选能过滤。
- 移动端卡片和桌面表格仍然存在。
- 点击“查看”进入详情编辑面板。
- 点击返回能回到列表。
- 修改用户信息后点击确认能更新列表。
- KYC 待审用户的审批按钮还能触发。

3. UI 不应肉眼变化

重点对比：

- 用户列表顶部标题区域。
- 搜索框和下拉框样式。
- 移动端用户卡片样式。
- 桌面端表格样式。
- 详情页三 tab 样式。

4. 不引入新依赖

本次拆分不需要新增 npm 包。

5. 不改旧组件文件

不要修改：

```txt
src/components/AdminUsersView.tsx
```

除非明确计划删除旧文件。当前阶段旧文件作为 UI 对照保留。

6. 不提交本地测试账号改动

不要把以下文件中的测试账号改动混进本次重构提交：

```txt
src/hooks/useAppState.ts
```

如果需要本地默认登录管理员账号，请单独处理，不要和组件拆分提交混在一起。

## 提交建议

推荐每个阶段一个提交：

```txt
refactor: extract admin users toolbar
refactor: extract admin users list
refactor: extract admin user mobile card
refactor: extract admin user desktop table
refactor: extract admin user details panel
```

不要把所有拆分塞进一个巨大提交。

## 禁止事项

请不要：

- 重写 UI。
- 引入 Ant Design 替换现有 Tailwind table。
- 改业务文案。
- 改颜色和间距。
- 接真实接口。
- 删除旧页面对照文件。
- 把客户端页面一起改了。
- 把 `useAppState.ts` 的本地登录账号改动混入提交。
- 一次性拆完整个 admin 目录。

## 推荐执行顺序总结

```txt
1. 创建 components 目录。
2. 抽 AdminUsersToolbar。
3. pnpm build。
4. 提交。
5. 抽 AdminUsersList。
6. pnpm build。
7. 提交。
8. 抽 AdminUserMobileCard。
9. pnpm build。
10. 提交。
11. 抽 AdminUserDesktopTable。
12. pnpm build。
13. 提交。
14. 评估是否拆 AdminUserDetailsPanel。
```

## 给审查 AI 的备注

拆分完成后，请重点审查：

- props 是否清晰。
- 是否有重复筛选逻辑。
- 是否误改 UI className。
- 是否有不必要的全局状态。
- 是否把业务更新逻辑放进纯展示组件。
- 是否把本地测试账号改动混入提交。
- 是否通过 `pnpm build`。
