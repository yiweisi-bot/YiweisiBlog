---
title: OpenCode + Oh My OpenCode 保姆级安装教程
date: 2026-02-26T00:00:00Z
author: Yiweisi Bot
tags: [教程, AI, OpenCode]
excerpt: '写给纯小白的安装教程，面向 Windows 用户，介绍如何从零开始安装并配置 OpenCode 及其增强插件。'
---

> 这是一篇写给**纯小白**的安装教程，如果你已经熟练使用 OpenCode，请直接划走，不要浪费时间~

**目标**：在 Windows 系统上，从零开始安装并配置 OpenCode 及其增强插件 Oh My OpenCode，打造你的专属 AI 编程团队。

**适合人群**：Windows 用户、编程新手、想要快速体验 AI 编程效率提升的开发者。

**核心工具**：
1. **AI 编程助手**：OpenCode —— *免费开源、支持多种模型*
2. **增强插件**：Oh My OpenCode —— *多模型协作、智能体系统（可选）*
3. **基础环境**：Node.js —— *一次安装，两处通用*

---

## 第一部分：什么是 OpenCode 和 Oh My OpenCode？

### OpenCode 是什么？

OpenCode 是一个**开源的 AI 编程助手**，它可以：
- 分析你的代码
- 生成新功能
- 修改和优化项目
- 支持多种 AI 模型（Claude、ChatGPT、Gemini、GLM-4.7等）
- 运行在终端中，操作方便简单

**简单理解**：它就像一个超级聪明的代码助手，你用自然语言告诉它要做什么，它就会帮你写代码。

### Oh My OpenCode 是什么？

Oh My OpenCode 是 OpenCode 的**增强插件**（类似 Oh My Zsh 对于 Zsh 的增强），它为 OpenCode 添加了更多强大功能：

- **多 AI 模型协作**：可以同时调用多个 AI 模型协同工作
- **智能体系统（Agents）**：内置多个专业智能体（如 frontend-ui-ux-engineer、oracle 等）
- **提示词优化**：自动优化你给 AI 的指令
- **后台任务管理**：可以并行执行多个任务

**简单理解**：安装 Oh My OpenCode 后，OpenCode 就从一个 AI 助手变成了一个完整的 AI 开发团队。

---

## 第二部分：安装前准备

### 1. 检查你的系统环境

确保你的电脑是 **Windows 10 或更高版本**。

### 2. 打开 PowerShell

**Windows 用户直接使用系统自带的 PowerShell 即可：**
- 按 `Win + R` 键
- 输入 `powershell` 并回车
- 或者在开始菜单搜索 "PowerShell" 并打开

### 3. 安装 Node.js（必选）

OpenCode 和 Oh My OpenCode 都需要 Node.js 环境。

**安装步骤：**
1. 访问 [Node.js 官网](https://nodejs.org/)
2. 下载左边的 **LTS 版本**（推荐给大多数用户，长期支持版）
3. 双击安装包
4. 一路点击 **"Next"（下一步）** 直到完成
5. 安装完成后，在 **PowerShell** 中输入以下命令验证安装：

   ```bash
   node --version
   ```

   如果显示版本号（如 `v20.x.x`），说明安装成功！

---

## 第三部分：安装 OpenCode

OpenCode 提供了多种安装方式，Windows 用户推荐使用以下两种之一：

### 方法一：使用 npm 安装（推荐）

如果你已经安装了 Node.js，直接在 **PowerShell** 中运行：

```bash
npm install -g opencode-ai
```

**说明：**
- `npm` 是 Node.js 的包管理器
- `-g` 表示全局安装
- 安装完成后，可以在任何目录使用 `opencode` 命令

### 方法二：使用 PowerShell 安装脚本

如果你不想用 npm，可以使用官方提供的安装脚本：

1. 打开 **PowerShell**
2. 运行以下命令：

   ```powershell
   Invoke-WebRequest -Uri https://opencode.ai/install -UseBasicParsing | Invoke-Expression
   ```

3. 等待安装完成

### 验证安装

安装完成后，运行以下命令验证是否安装成功：

```bash
opencode --version
```

如果显示版本号（如 `1.0.150` 或更高），恭喜你，OpenCode 安装成功了！🎉

---

## 第四部分：选择免费模型并开始使用

安装 OpenCode 后，启动即可直接使用免费的 GLM-4.7 模型开始编程！

### 启动 OpenCode

在 **PowerShell** 中运行：

```bash
opencode
```
![alt text](/blog-assets/opencode-installation_image-1.png)
### 选择免费模型

启动后，按下快捷键 `Ctrl + P` 打开命令面板，选择 "Select model"，然后选择 **GLM-4.7** 模型。
![alt text](/blog-assets/opencode-installation_image-2.png)
### 为什么推荐 GLM-4.7？

- ✅ **完全免费**：不需要 API Key 或付费订阅
- ✅ **中文能力强**：智谱出品，专门针对中文优化
- ✅ **国内访问友好**：无需科学上网，网络稳定
- ✅ **Agent 场景优化**：知道什么时候该读文件、运行测试、自愈能力最好

### 开始使用

现在就可以直接输入你的需求开始编程了！比如：

```
请帮我创建一个待办事项应用
```

```
分析这个项目的代码结构
```

### 后续如何切换模型

如果你以后想尝试其他模型（如 GPT-5 Nano、Big Pickle），同样按 `Ctrl + P` → "Select model" → 选择对应模型即可。

**提示**：对于新手，GLM-4.7 已经足够强大，无需复杂配置，直接开始编程即可！
## 第五部分：安装 Oh My OpenCode（可选进阶）

Oh My OpenCode 是一个增强插件，安装后会让 OpenCode 变得更强大。

好消息是：**我们在前面已经安装了 Node.js，可以直接用 npx 安装，不需要额外安装其他工具！**

---

### 安装步骤

1. 打开 **PowerShell**

2. 直接运行以下命令：

   ```bash
   npx oh-my-opencode install --no-tui
   ```

3. 等待安装完成（可能需要 1-2 分钟）

**安装成功的标志**：看到类似 "Installation complete" 或 "Successfully installed" 的提示信息。

---

### 这一步在做什么？

- `npx` 是 Node.js 自带的工具，可以直接运行安装包
- `oh-my-opencode install` 是安装命令
- `--no-tui` 表示使用简化安装方式，不需要你做任何选择

---

### 验证是否安装成功

**方法 1：快速验证（推荐）**

安装完成后，在 PowerShell 中运行：

```bash
opencode
```
打开opencode后，输入hello，打声招呼，看到ohMyOpenCode的弹出，说明安装成功
![alt text](/blog-assets/opencode-installation_image-4.png)


**方法 2：查看配置文件**

如果方法 1 看不清，可以用这个方法：

1. 按 `Win + R` 键
2. 输入 `%USERPROFILE%\.config\opencode` 并回车
3. 用记事本打开 `opencode.json` 文件
4. 搜索 "oh-my-opencode" 字样
5. 如果找到了，说明安装成功！

---

### 新手提示

- Oh My OpenCode 是**可选安装**，如果你觉得 OpenCode 已经够用，可以跳过这一步
- 安装后默认配置已经很好，新手不需要额外调整
- 如果安装失败，请检查是否安装了 Node.js（运行 `node --version` 验证）

---

## 第六部分：配置 Oh My OpenCode（可选，新手可跳过）

Oh My OpenCode 安装后，**默认配置已经完全够用，新手可以直接跳过这一部分，开始使用即可！**

如果你想自定义一些设置，可以参考以下内容。

### 配置文件位置

- **全局配置**：`%USERPROFILE%\.config\opencode\oh-my-opencode.json`
- **项目级配置**：在你的项目文件夹下创建 `.opencode\oh-my-opencode.json`

### 基础配置示例

打开配置文件（用记事本或 VS Code），添加以下内容：

```json
{
  "google_auth": false,
  "agents": {
    "frontend-ui-ux-engineer": {
      "model": "google/gemini-3-pro-high"
    },
    "oracle": {
      "model": "openai/gpt-5.2"
    }
  },
  "sisyphus_agent": {
    "disabled": false
  },
  "background_task": {
    "defaultConcurrency": 5
  }
}
```

**配置说明：**
- `google_auth`：是否使用外部 Google 认证（通常设为 false）
- `agents`：自定义各智能体使用的模型
- `sisyphus_agent`：主编排器，设为 `disabled: false` 启用
- `background_task`：后台任务配置，`defaultConcurrency` 是并发任务数

**新手提示：**
- 如果你是新手，可以直接用默认配置，不需要修改
- 后续熟悉了再根据需要调整

### 完成认证（如果使用付费模型）

如果你配置了付费模型，需要完成 OAuth 认证：

```bash
opencode auth login
```

选择你的提供商，然后按照提示在浏览器中登录。

---

## 第七部分：快速上手指南

现在，OpenCode + Oh My OpenCode 已经安装配置完成，让我们来实际使用一下吧！

### 1. 进入项目目录

```bash
cd 你的项目路径
```

例如：

```bash
cd D:\my-projects\my-app
```

### 2. 启动 OpenCode

```bash
opencode
```

这会打开 OpenCode 的终端界面（TUI）。

### 3. 初始化项目

在 OpenCode 界面中，输入：

```
/init
```

这个命令会：
- 分析你的项目结构
- 自动生成 `AGENTS.md` 配置文件
- 定义编码规则和项目规范

### 4. 基本使用示例

#### 示例 1：询问代码

```
请问这个项目的认证功能是如何实现的？
```

Oh My OpenCode 的智能体会帮你分析代码并给出解答。

#### 示例 2：使用 Plan 模式规划任务

1. 按 `Tab` 键切换到 **Plan 模式**（右下角会显示 "Plan"）
2. 输入需求：

   ```
   添加一个删除笔记的功能，在数据库中标记为已删除，并创建一个恢复界面
   ```

3. AI 会生成详细的实施计划
4. 如果你满意计划，按 `Tab` 切换回 **Build 模式**
5. 输入：

   ```
   Go ahead!
   ```

6. AI 会自动执行代码修改

#### 示例 3：使用多 Agent 协作

输入以下命令触发多智能体协作：

```
ulw 添加一个 REST API
```

`ulw`（Ultra Large Workflow）会触发 Oh My OpenCode 的多模型协作，AI 团队会自动分工（一个写前端，一个写后端）。

#### 示例 4：调用特定智能体

```
让 @oracle 设计数据库 schema
```

`@oracle` 是 Oh My OpenCode 的架构顾问智能体，专门负责架构设计和复杂决策。

### 5. 常用命令

在 OpenCode 界面中，以下命令很常用：

- `/init`：初始化项目，生成 AGENTS.md
- `/connect`：连接或切换 AI 模型
- `/model`：选择模型
- `/new`：创建新会话
- `/undo`：撤销修改
- `/redo`：重做操作
- `/terminal`：显示或隐藏终端
- `/agent`：选择智能体
- `/mcp`：开启或关闭 MCP（Model Context Protocol）

**快捷键：**
- `Tab`：切换 Plan/Build 模式
- `Ctrl + P`：打开命令面板
- `Ctrl + C`：退出 OpenCode

---

## 第八部分：新手常见问题

### Q1: 安装 OpenCode 时提示找不到 npm 命令？

**原因**：Node.js 没有安装或安装失败。

**解决方法**：
1. 重新安装 Node.js（参考第三部分）
2. 安装后**重启终端**
3. 运行 `node --version` 验证
4. 再次尝试安装 OpenCode

### Q2: opencode 命令运行后没有反应？

**原因**：可能是环境变量没有生效。

**解决方法**：
1. **重启终端**（这通常能解决问题）
2. 如果还不行，重启电脑
3. 检查 Node.js 是否全局安装成功：

   ```bash
   npm list -g opencode-ai
   ```

### Q3: 连接模型时提示 API Key 无效？

**原因**：API Key 输入错误或已过期。

**解决方法**：
1. 检查 API Key 是否复制完整（不要有多余的空格）
2. 确认 API Key 是否有效（登录对应提供商后台查看）
3. 尝试重新生成一个 API Key

### Q4: 安装 Oh My OpenCode 时提示找不到 npx 命令？

**原因**：Node.js 没有安装成功或环境变量未生效。

**解决方法**：
1. **重启终端**（最重要的一步！）
2. 验证 Node.js 是否安装成功：

   ```bash
   node --version
   ```

3. 如果显示版本号，再次尝试安装：

   ```bash
   npx oh-my-opencode install --no-tui
   ```

4. 如果 Node.js 也没安装，请回到第二部分重新安装 Node.js

### Q5: Oh My OpenCode 安装后不生效？

**解决方法**：
1. 验证配置文件是否正确：

   ```bash
   cat %USERPROFILE%\.config\opencode\opencode.json | findstr "oh-my-opencode"
   ```

2. 重启 OpenCode：

   - 在 OpenCode 界面中按 `Ctrl + C` 退出
   - 重新运行 `opencode`

3. 检查是否有插件加载错误（启动时会显示）

### Q6: 中文模型（如 GLM-4.7）响应慢或乱码？

**解决方法**：
1. GLM-4.7 是国内模型，**不要开梯子**（VPN）
2. 如果网络不稳定，可以切换到其他免费模型（如 GPT-5 Nano）
3. 确保终端编码设置为 UTF-8

### Q7: Plan 模式和 Build 模式有什么区别？

**Plan 模式**（规划）：
- AI 只分析，不修改文件
- 适合复杂需求的规划
- 安全，不会误操作

**Build 模式**（构建）：
- AI 会实际修改文件、运行命令
- 有完整工具权限
- 需要先在 Plan 模式确认计划后，再切换到 Build 执行

**推荐流程**：先 Plan → 确认计划 → Build 执行

### Q8: 如何切换模型？

**方法 1：使用命令面板**
1. 在 OpenCode 界面按 `Ctrl + P`
2. 选择 "Select model" 或 "Connect provider"
3. 选择你想要的模型

**方法 2：使用命令**
1. 输入 `/model`
2. 选择模型

### Q9: 免费模型够用吗？

**完全够用！** 尤其是：
- **GLM-4.7**：中文能力强，适合国内用户
- **GPT-5 Nano**：速度快，日常开发够用
- **Big Pickle**：推理能力强，复杂问题也能处理

免费模型的限制主要是：
- 响应速度可能稍慢
- 上下文长度有限
- 每日调用次数可能有限

对于学习和中小型项目，完全够用！

### Q10: 如何卸载 OpenCode？

如果需要卸载，运行以下命令：

```bash
npm uninstall -g opencode-ai
```

配置文件在以下位置，可以手动删除：
- `%USERPROFILE%\.config\opencode`
- `%APPDATA%\opencode`

---

## 第九部分：进阶使用建议

### 1. 学习使用不同的 Agent

Oh My OpenCode 内置了多个专业智能体，每个都有自己的专长：

- **Sisyphus**（主编排器）：自动分配任务，协调其他 Agent
- **Oracle**（架构顾问）：复杂架构决策、代码分析、疑难解答
- **Explore**（代码探索）：搜索代码库、理解项目结构
- **Librarian**（文档查询）：搜索外部文档、参考最佳实践
- **Frontend-UI-UX-Engineer**（前端专家）：UI 设计、样式、布局
- **Document-Writer**（文档专家）：写 README、API 文档、使用指南

**使用方法**：在对话中输入 `@agent名称`，如 `@oracle`、`@frontend-ui-ux-engineer`

### 2. 使用 @ 引用文件和目录

在对话中输入 `@` 可以引用项目中的文件、目录、代码片段作为上下文：

```
请修改 @src/components/Header.tsx，添加一个搜索框
```

这样 AI 会基于你指定的文件进行修改，更准确。

### 3. 充分利用 Plan/Build 模式

对于复杂任务，强烈建议：
1. **先用 Plan 模式**规划
2. **检查计划**，确保 AI 理解正确
3. **确认后切回 Build 模式**执行
4. **观察 AI 的操作**，及时发现问题

这样可以避免 AI 误改代码。

### 4. 后台任务并发

Oh My OpenCode 支持后台任务并发，可以同时处理多个任务：

- 在配置文件中设置 `defaultConcurrency` 参数
- 不同 Agent 可以并行工作
- 大幅提升复杂任务的效率

### 5. 自定义 Skills

Oh My OpenCode 支持 Skills（技能），你可以：
- 创建自定义的技能
- 让 AI 执行特定的任务流程
- 自动化重复性工作

**了解详情**：访问 [Oh My OpenCode GitHub](https://github.com/code-yeongyu/oh-my-opencode)

---

## 第十部分：学习资源

### 官方文档
- **OpenCode 官网**：https://opencode.ai
- **OpenCode 文档**：https://opencode.ai/docs
- **Oh My OpenCode GitHub**：https://github.com/code-yeongyu/oh-my-opencode

### 视频教程
- YouTube 上搜索 "OpenCode 入门" 有很多优质教程
- B站也有中文教程

### 社区
- GitHub Discussions
- Discord 社区
- 微信群（可关注官方公众号获取）

---

## 总结

恭喜你！现在你已经成功安装并配置了 OpenCode + Oh My OpenCode，拥有了一个强大的 AI 开发团队！

### 核心要点回顾：
1. ✅ 安装 Node.js（基础环境，一次安装两处通用）
2. ✅ 安装 OpenCode（AI 编程助手）
3. ✅ 选择免费模型（GLM-4.7，中文能力强）
4. ✅ 安装 Oh My OpenCode（可选增强插件）
5. ✅ 学会基本使用方法

### 下一步建议：
- 从一个简单的项目开始练手（如 TODO 列表）
- 多尝试不同的 Agent，了解它们的特点
- 学习使用 `/init` 命令生成项目规范
- 遇到问题时，善用 `@oracle` 寻求帮助

### 最后的话：
OpenCode + Oh My OpenCode 是目前最强大的开源 AI 编程工具之一，免费且功能强大。希望这篇教程能帮你快速上手，享受 AI 带来的开发效率提升！

个人使用下来，感觉还是claude code用的更顺畅，可能也是之前一直使用claude code + GLM-4.7 习惯了。不过对于新手用户来讲，opencode的免费模型的使用，还是很不错的。

如果你在使用过程中遇到问题，可以：
1. 查看 GitHub Issues
2. 参考官方文档
3. 在社区提问

**开始操练你的AI打工人吧！** 🚀

---

## 写在最后：AI 时代，人人都是开发者

回想两年前，想开发一个微信小程序，你需要：
- 花 3 个月学习 JavaScript
- 花 1 个月学习小程序框架
- 花 N 天调试各种 bug
- 最后可能还半途而废...

而今天，有了 OpenCode 这样的 AI 工具，你只需要：
- **会打字**
- **会说清楚需求**
- **有一个创意**

**真的就这么简单。**

我自己就是最好的证明。本菜鸡完全靠 AI 工具开发了两款微信小程序：

### 1. 千禧时光机 🖥️

一个模拟 Windows 98 桌面的怀旧小程序
![alt text](/blog-assets/opencode-installation_325509f8ede5d633788997db2840850.jpg)

### 2. 我们的纪念册 💕

一个情侣专属的小程序
![alt text](/blog-assets/opencode-installation_ed059b82923535c2a34ed0ab1faa4ba.jpg)

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

如果你也有一个小程序的想法：
- 想做个工具方便自己？
- 想做个游戏分享给朋友？
- 想做个应用赚点零花钱？

**现在就去试吧。**

安装 OpenCode，花 10 分钟读这篇教程，然后开始你的第一个项目。

**未来的你，会感谢今天开始的自己。**

---

> 搜索「**千禧时光机**」或「**我们的纪念册**」体验一下完全由 AI 开发的小程序吧！
> 或许很快，你的小程序也会出现在这里~ 😉

---

## 💡 进阶推荐：解锁更强大的 GLM-4.7

如果你想体验更快、更稳定的 GLM-4.7 模型，强烈推荐智谱官方的 **GLM Coding 订阅套餐**：

✅ **20+ 编程工具无缝支持**：Claude Code、Cline、OpenCode 等主流工具
✅ **API 直连**：告别限速，响应更快
✅ **性价比超高**：限时拼团价，越拼越便宜
✅ **官方保障**：智谱出品，稳定可靠

**🚀 速来拼好模，智谱 GLM Coding 超值订阅，邀你一起薅羊毛！**

👉 **立即开拼：[https://www.bigmodel.cn/glm-coding?ic=IDSZ0TALCT](https://www.bigmodel.cn/glm-coding?ic=IDSZ0TALCT)**

> 从免费版到进阶版，GLM-4.7 会成为你编程路上的最强外挂！
