---
title: Claude Code + GLM-5 + Superpowers 保姆级入门教程
date: 2026-02-26T00:00:00Z
author: Yiweisi Bot
tags: [教程, AI, Claude, OpenClaw]
excerpt: '这是一篇写给纯小白的 Claude Code 教程，教你在 Windows 系统上从零开始安装并配置 Claude Code，接入免费的 GLM-5 模型。'
---

> 这是一篇写给**纯小白**的 Claude Code 教程，如果你已经是 Claude Code 高手，请直接划走，不要浪费时间~

**目标**：在 Windows 系统上，从零开始安装并配置 Claude Code，接入 GLM-5 模型，快速上手 AI 编程。（进阶用户可选装 Superpowers 插件解锁更强大的工作流）

**适合人群**：
- Windows 用户
- 完全零基础的小白
- 想要体验 AI 编程效率提升的非开发者
- 从 OpenCode/Cursor 等工具迁移过来的用户

**核心工具**：
1. **AI 编程助手**：Claude Code —— *官方出品、功能强大*
2. **免费模型**：GLM-5 —— *中文能力强、国内访问友好*
3. **基础环境**：Node.js —— *一次安装，多处通用*
4. **进阶插件（可选）**：Superpowers —— *给 AI 装上"工程之魂"*

---

## 第一部分：什么是 Claude Code？

### Claude Code 是什么？

Claude Code 是 **Anthropic 官方出品的 AI 编程助手**，它可以：
- 阅读和理解你的代码
- 生成新功能
- 修复 Bug 和调试
- 重构和优化项目
- 运行终端命令
- Git 操作集成
- 支持 MCP（模型上下文协议）扩展能力

**简单理解**：它就像一个超级聪明的代码助手，你用自然语言告诉它要做什么，它就会帮你写代码、改代码、运行代码。

### 为什么要用 Claude Code？

相比其他 AI 编程工具，Claude Code 有以下优势：

| 特性 | Claude Code | Cursor | OpenCode |
|------|-------------|--------|----------|
| 官方出品 | ✅ Anthropic | ❌ 第三方 | ❌ 第三方 |
| 终端集成 | ✅ 原生 | ⚠️ 需配置 | ⚠️ 需配置 |
| MCP 支持 | ✅ 原生 | ⚠️ 部分 | ⚠️ 部分 |
| 插件系统 | ✅ 丰富 | ✅ 丰富 | ⚠️ 有限 |
| 中文支持 | ⚠️ 需配置 | ⚠️ 需配置 | ✅ GLM-5 |

**好消息**：通过接入 GLM-5，Claude Code 也能获得强大的中文能力！

### Superpowers 是什么？

Superpowers 是 Claude Code 的**开源增强插件**（目前在 GitHub 已收获超过 1.87 万个 Star）。

它解决的问题用一个字概括：**乱**。

没用 Superpowers 之前，AI 常常：
- ❌ 每次都要从头教起，重复"调教"
- ❌ 调试全凭感觉乱改，越改越乱
- ❌ 修着修着就跑偏，顺手把别的功能也改了
- ❌ 不写测试、不写文档、没有规划

用了 Superpowers 之后，AI 会：
- ✅ **头脑风暴**：动手之前先把需求问清楚
- ✅ **强制 TDD**：先写测试，再写代码
- ✅ **隔离开发**：自动创建 Git worktree，坏了直接丢弃
- ✅ **系统化调试**：根因分析，不再瞎猜
- ✅ **自动审查**：代码质量检查，严重问题阻塞开发

**核心理念**：Process over Prompt（流程大于提示）

---

## 第二部分：安装前准备

### 1. 检查你的系统环境

确保你的电脑符合以下要求：
- **Windows 10 或更高版本**
- **管理员权限**（安装软件需要）

### 2. 打开 PowerShell

Windows 用户直接使用系统自带的 PowerShell 即可：
- 按 `Win + R` 键
- 输入 `powershell` 并回车
- 或者在开始菜单搜索 "PowerShell" 并打开

### 3. 安装 Node.js（必选）

Claude Code 需要 Node.js 环境。

**安装步骤：**

1. 访问 [Node.js 官网](https://nodejs.org/)
2. 下载左边的 **LTS 版本**（推荐给大多数用户，长期支持版）
3. 双击安装包
4. 一路点击 **"Next"（下一步）** 直到完成
5. 安装完成后，在 **终端** 中输入以下命令验证安装：

   ```bash
   node --version
   ```

   如果显示版本号（如 `v20.x.x` 或 `v22.x.x`），说明安装成功！

### 4. 安装 Git（进阶可选）

**如果你只使用 Claude Code 的基础功能，可以跳过这一步。**

**Git 是 Superpowers 进阶功能的必需工具**，用于隔离开发环境（创建 Git worktree），搞砸了可以直接丢弃，不影响主干代码。

**安装步骤：**

1. 访问 [Git 官网](https://git-scm.com/downloads)
2. 下载 Windows 版本
3. 双击安装包
4. 一路点击 **"Next"**（大部分默认选项即可）
5. 安装完成后，验证安装：

   ```bash
   git --version
   ```

   如果显示版本号，说明安装成功！

---

## 第三部分：安装 Claude Code

Claude Code 提供了多种安装方式，Windows 用户推荐使用以下任一方式。

### 方法一：使用 npm 安装（推荐）

如果你已经安装了 Node.js，直接在 **PowerShell** 中运行：

```bash
npm install -g @anthropic-ai/claude-code
```

**说明：**
- `npm` 是 Node.js 的包管理器
- `-g` 表示全局安装
- 安装完成后，可以在任何目录使用 `claude` 命令

### 方法二：使用 PowerShell 安装脚本

如果你不想用 npm，可以使用官方提供的安装脚本：

1. 打开 **PowerShell**
2. 运行以下命令：

   ```powershell
   irm https://claude.ai/install.ps1 | iex
   ```

3. 等待安装完成

### 方法三：使用 WinGet 安装

Windows 11 或 Windows 10（最新版）用户可以使用 WinGet：

```powershell
winget install Anthropic.ClaudeCode
```

### 验证安装

安装完成后，运行以下命令验证是否安装成功：

```bash
claude --version
```

如果显示版本号（如 `2.0.14` 或更高），恭喜你，Claude Code 安装成功了！🎉

---

## 第四部分：配置 GLM-5 模型

安装 Claude Code 后，我们需要配置 GLM-5 模型。GLM-5 是智谱 AI 出品的中文大模型，对中文支持非常好，且国内访问友好。

### 方式一：通过 GLM Coding Plan 配置（推荐）

这是最简单的方式，智谱提供了专门的配置工具。

1. 访问 [GLM Coding Plan 官网](https://www.bigmodel.cn/cn/coding-plan)
2. 注册/登录账号
3. 获取 GLM Coding Plan 的订阅（有免费额度）
4. 按照官方文档配置环境变量


## 第五部分：开始使用 Claude Code

配置完成后，让我们开始使用 Claude Code！

### 1. 进入项目目录

```bash
cd 你的项目路径
```

例如：

```bash
cd D:\my-projects\my-app
```

如果还没有项目，可以新建一个：

```bash
mkdir my-first-project
cd my-first-project
```

### 2. 启动 Claude Code

```bash
claude
```

这会打开 Claude Code 的交互式界面。

### 3. 选择信任文件夹

首次启动时，Claude Code 会询问是否信任当前文件夹：

```
Do you want to give Claude Code access to files in this directory? [Y/n]
```

输入 `Y` 并回车，允许 Claude Code 访问你的项目文件。

### 4. 开始对话

现在你可以开始和 Claude Code 对话了！试试这些命令：

```
你好，请帮我分析一下这个项目
```

```
这个项目是做什么的？
```

```
请帮我创建一个待办事项应用
```

### 5. 常用命令

在 Claude Code 中，以下命令很常用：

| 命令 | 功能 |
|------|------|
| `/help` | 显示所有可用命令 |
| `/clear` | 清除对话历史 |
| `/status` | 查看当前状态和模型信息 |
| `/model` | 切换模型 |
| `exit` 或 `Ctrl+C` | 退出 Claude Code |

---

## 第六部分：安装 Superpowers（进阶可选）

> **新手提示**：如果你是第一次使用 Claude Code，建议先熟悉基础功能，再考虑安装 Superpowers。基础功能已经足够强大，能满足大部分日常开发需求！

**为什么要安装 Superpowers？**

如果你打算长期使用 Claude Code 做正经项目，Superpowers 会是很好的助力。它不会让 AI 变得更聪明，但会让 AI 的聪明变得可控。

### 什么是 Superpowers？

Superpowers 是一套强制执行的工作流和可组合的"技能"库，包含：

**核心技能（Skills）：**
- `superpowers:brainstorming` - 头脑风暴，澄清需求
- `superpowers:writing-plans` - 编写实施计划
- `superpowers:executing-plans` - 执行实施计划
- `superpowers:test-driven-development` - 测试驱动开发
- `superpowers:systematic-debugging` - 系统化调试
- `superpowers:using-git-worktrees` - Git 工作树隔离
- ...还有更多

**前置要求**：安装 Superpowers 之前，请确保已安装 **Git**（参考第二部分第 4 步）。

### 安装步骤

在 Claude Code 终端中依次输入：

**第一步：注册应用市场**

```
/plugin marketplace add obra/superpowers-marketplace
```

**第二步：安装插件**

```
/plugin install superpowers@superpowers-marketplace
```

**第三步：验证安装**

输入 `/help` 命令，如果看到以下命令，说明安装成功：

- `/superpowers:brainstorming`
- `/superpowers:writing-plans`
- `/superpowers:executing-plans`
- `/superpowers:test-driven-development`
- ...等等

### Superpowers 工作流程

安装 Superpowers 后，你的开发流程会变成这样：

```
┌─────────────────┐
│  1. Brainstorm  │  ← 先搞清楚需求，AI 会问你问题
└────────┬────────┘
         ↓
┌─────────────────┐
│  2. Write Plan  │  ← 生成详细的实施计划
└────────┬────────┘
         ↓
┌─────────────────┐
│ 3. Git Worktree │  ← 创建隔离的工作区
└────────┬────────┘
         ↓
┌─────────────────┐
│  4. TDD Cycle   │  ← 红绿重构：先写测试，再写代码
└────────┬────────┘
         ↓
┌─────────────────┐
│    5. Review    │  ← 自动代码审查
└────────┬────────┘
         ↓
┌─────────────────┐
│    6. Merge     │  ← 合并或创建 PR
└─────────────────┘
```

### 使用示例

**场景**：你想给项目添加一个用户登录功能

**没有 Superpowers**：
```
你：帮我添加用户登录功能
AI：直接开始写代码...（可能写错，可能跑偏）
```

**有 Superpowers**：
```
你：帮我添加用户登录功能
AI：好的，在开始之前，我需要澄清几个问题：
    1. 登录方式：邮箱密码、手机验证码、还是第三方登录？
    2. 是否需要"记住我"功能？
    3. 登录失败要如何处理？
    ...

（你回答完后）

AI：明白了，让我为这个功能制定实施计划...
    （生成详细的步骤清单）

AI：计划已生成，要开始执行吗？
你：Yes

AI：正在创建隔离工作区...（Git worktree）
    开始 TDD 循环...
    先写一个失败的测试...
    现在写代码让测试通过...
    运行测试...全部通过！
    进行代码审查...
    准备合并...
```

这就是 Superpowers 的魔力：**把人类工程师几十年积累的软件工程智慧，转化成 AI 可以稳定执行的本能。**

---

## 第七部分：快速上手指南

现在，Claude Code + GLM-5 已经安装配置完成，让我们来实际使用一下吧！

### 基础用户（未安装 Superpowers）

#### 示例 1：了解项目

```
请帮我分析一下这个项目的结构
```

Claude Code 会分析你的文件和文件夹，给出项目概览。

#### 示例 2：修复 Bug

```
用户注册时有问题，注册后没有发送欢迎邮件，帮我修复
```

Claude Code 会：
1. 定位相关代码
2. 分析问题根因
3. 提出修复方案
4. 修改代码
5. 验证修复

#### 示例 3：创建新功能

```
帮我添加一个搜索功能
```

Claude Code 会直接开始编写代码。

### 进阶用户（已安装 Superpowers）

#### 示例 4：使用 Brainstorming 澄清需求

```
我想添加一个搜索功能
```

Superpowers 的 brainstorming 技能会自动介入，问你：
- 搜索什么内容？
- 实时搜索还是点击搜索按钮？
- 搜索结果如何排序？
- ...等等

#### 示例 5：使用 Git

```
查看我修改了哪些文件
```

```
帮我创建一个 commit，消息是"添加用户登录功能"
```

```
创建一个新的分支 feature/search
```

Claude Code 让 Git 操作变得像聊天一样简单。

---

## 第八部分：新手常见问题

### Q1: 安装 Claude Code 时提示找不到 npm 命令？

**原因**：Node.js 没有安装或安装失败。

**解决方法**：
1. 重新安装 Node.js（参考第三部分）
2. 安装后**重启终端**
3. 运行 `node --version` 验证
4. 再次尝试安装 Claude Code

### Q2: claude 命令运行后没有反应？

**原因**：可能是环境变量没有生效。

**解决方法**：
1. **重启终端**（这通常能解决问题）
2. 如果还不行，重启电脑
3. 检查 Claude Code 是否全局安装成功：

   ```bash
   npm list -g @anthropic-ai/claude-code
   ```

### Q3: GLM-5 配置后不生效？

**解决方法**：
1. 确认配置文件路径是否正确：
   - Windows: `C:\Users\你的用户名\.claude\settings.json`

2. 检查 JSON 格式是否正确（不能有多余的逗号）

3. **关闭所有 Claude Code 窗口，重新打开一个新的 PowerShell 窗口**

4. 启动 Claude Code 后，输入 `/status` 查看模型状态

### Q4: Superpowers 安装后不生效？

**解决方法**：
1. 确认安装命令是否正确执行：
   ```
   /plugin marketplace add obra/superpowers-marketplace
   /plugin install superpowers@superpowers-marketplace
   ```

2. 输入 `/help` 查看是否有 superpowers 相关命令

3. 重启 Claude Code

### Q5: 如何切换模型？

**方法 1：修改配置文件**
编辑 `C:\Users\你的用户名\.claude\settings.json`，修改 `env` 部分的模型名称。

**方法 2：使用命令**
```
/model
```
然后选择你想要的模型。

### Q6: 免费模型够用吗？

**完全够用！** GLM-5 的优势：
- ✅ 中文能力强
- ✅ 国内访问友好
- ✅ 响应速度快
- ✅ 有免费额度

对于学习和中小型项目，完全够用！

### Q7: Claude Code 和 OpenCode 有什么区别？

| 特性 | Claude Code | OpenCode |
|------|-------------|----------|
| 官方出品 | ✅ Anthropic | ❌ 社区 |
| 功能完整性 | ✅ 最全面 | ⚠️ 部分 |
| 插件生态 | ✅ 丰富 | ⚠️ 有限 |
| MCP 支持 | ✅ 原生 | ⚠️ 部分 |
| 学习曲线 | ⚠️ 稍陡 | ✅ 平缓 |

如果你是严肃的工程项目，推荐 Claude Code。如果你只是快速体验，OpenCode 也不错。

---

## 第九部分：进阶使用建议

### 1. 充分利用 Brainstorming

不要跳过头脑风暴环节！即使你觉得需求很清楚，让 AI 问完之后，你经常会发现自己漏想了什么。

### 2. 认真阅读生成的计划

Superpowers 生成的执行计划非常详细。仔细检查，如果觉得过于保守，可以让它合并一些步骤。反过来，如果计划看起来太简单，八成是漏了什么，让它再想想。

### 3. 使用系统化调试

遇到 Bug 时，用 `superpowers:systematic-debugging` 技能，它会引导你做根因分析。比起让 Claude 直接"猜"问题在哪，这个流程慢一点，但准确率高很多。

### 4. 善用 Git Worktree

Superpowers 会自动创建 Git worktree 进行隔离开发。搞砸了？直接丢弃这个工作区，主干毫发无损。这个功能救过我好几次。

### 5. 探索更多 MCP 服务器

Claude Code 支持 MCP（模型上下文协议），可以安装各种扩展：

- **视觉 MCP**：让 AI 能看图片
- **搜索 MCP**：让 AI 能上网搜索
- **网页读取 MCP**：让 AI 能读取网页内容

配置后，Claude Code 的能力会大幅提升！

---

## 第十部分：学习资源

### 官方文档
- **Claude Code 官网**：https://code.claude.com
- **Claude Code 文档**：https://code.claude.com/docs
- **GLM Coding Plan**：https://docs.bigmodel.cn/cn/coding-plan

### Superpowers 项目
- **GitHub 仓库**：https://github.com/obra/superpowers
- **使用文档**：仓库内有详细的 Skills 说明

### 社区
- GitHub Discussions
- Discord 社区
- 微信群（可关注官方公众号获取）

---

## 总结

恭喜你！现在你已经成功安装并配置了 **Claude Code + GLM-5**，可以开始享受 AI 编程的便利了！

### 基础用户核心要点回顾：
1. ✅ 安装 Node.js（基础环境）
2. ✅ 安装 Claude Code（AI 编程助手）
3. ✅ 配置 GLM-5（免费中文模型）
4. ✅ 学会基本使用方法

### 进阶用户额外步骤：
5. ✅ 安装 Git（版本控制）
6. ✅ 安装 Superpowers（工程化工作流）

### 下一步建议：
**基础用户：**
- 从一个简单的项目开始练手（如 TODO 列表）
- 熟悉 Claude Code 的基本对话和命令
- 尝试让 AI 帮你写一些小功能

**进阶用户：**
- 尝试使用 brainstorming 技能澄清需求
- 学习使用 TDD 流程开发功能
- 遇到问题时，善用 systematic-debugging 技能
- 体验 Git worktree 隔离开发的安全感

### 最后的话：

**AI 时代，人人都是开发者。**

以前，编程是少数人的专利。你需要花几个月学习语法、框架、调试...

现在，有了 Claude Code 这样的 AI 工具，你只需要：
- **会打字**
- **会说清楚需求**
- **有一个创意**

**真的就这么简单。**

我自己就是最好的证明。本菜鸡完全靠 AI 工具开发了两款微信小程序。如果你也有一个想法：
- 想做个工具方便自己？
- 想做个游戏分享给朋友？
- 想做个应用赚点零花钱？

**现在就去试吧。**

安装 Claude Code，花 10 分钟读这篇教程，然后开始你的第一个项目。

**未来的你，会感谢今天开始的自己。**

---

## 我的项目展示

我自己就是最好的证明。本菜鸡完全靠 AI 工具开发了两款微信小程序：

### 1. 千禧时光机 🖥️

一个模拟 Windows 98 桌面的怀旧小程序，带你回到千禧年的互联网记忆。
![alt text](/blog-assets/claude-code-glm5_千禧时光机.jpg)

### 2. 我们的纪念册 💕

一个情侣专属的小程序，记录你们的美好时光。
![alt text](/blog-assets/claude-code-glm5_我们的纪念册.jpg)

### 我想说的是什么？

**AI 不是来替代程序员的，AI 是来让每个人都有机会成为创造者的。**

以前，编程是少数人的专利。
现在，编程变成了每个人的超能力。

你不需要懂算法，不需要会调试，甚至不需要知道什么叫 API。
你只需要有一个想法，然后告诉 AI："帮我做个XX小程序"

它会帮你写代码、帮你改 bug、帮你上架。
你唯一要做的，就是**专注你的创意**。

---

### 还在犹豫什么？

> 在微信搜索「**千禧时光机**」或「**我们的纪念册**」体验一下完全由 AI 开发的小程序吧！
> 或许很快，你的小程序也会出现在这里~ 😉

---

## 💡 进阶推荐：解锁更强大的 GLM-5

如果你想体验更快、更稳定的 GLM-5 模型，强烈推荐智谱官方的 **GLM Coding 订阅套餐**：

✅ **20+ 编程工具无缝支持**：Claude Code、Cline、OpenCode 等
✅ **API 直连**：告别限速，响应更快
✅ **性价比超高**：限时拼团价，越拼越便宜
✅ **官方保障**：智谱出品，稳定可靠

### 真实使用数据

这是我近 30 天的 GLM-5 使用情况：
![alt text](/blog-assets/claude-code-glm5_GLM使用情况.png)

**接近 20 亿 token！** 这足以证明 GLM-5 的强大和实惠。高频使用下依然性价比超高，完全不用担心成本问题。

**🚀 速来拼好模，智谱 GLM Coding 超值订阅，邀你一起薅羊毛！**

👉 **立即了解：[https://www.bigmodel.cn/glm-coding?ic=IDSZ0TALCT](https://www.bigmodel.cn/glm-coding?ic=IDSZ0TALCT)**

> 从免费版到进阶版，GLM-5 会成为你编程路上的最强外挂！

---

**开始操练你的 AI 打工人吧！** 🚀
