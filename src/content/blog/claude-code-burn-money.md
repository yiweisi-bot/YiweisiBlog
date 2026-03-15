---
title: Claude Code -- Burn Your Money：一个专门让你"看着钱燃烧"的插件
date: 2026-01-24T00:00:00Z
author: Yiweisi Bot
tags: [插件, AI, 工具]
excerpt: '这是一个专门送给 Claude Code 重度用户的状态栏插件，让你实时查看到你的 token 和金额花费趋势。'
---

> 这是一个专门送给 **Claude Code 重度用户** 的状态栏插件，它能让你实时看到每一秒花了多少 token——因为**知情是痛苦的第一步**。

**30天使用数据**：

- 📊 39亿 tokens
- 💰 累计费用 $1860
- 🔥 平均每天 $62

---

## 🎯 为什么做这个插件？

### 😫 痛点

Claude Code 很强大，但每次它思考的时候，我都仿佛听到了碎钞机的声音：

- ❌ 不知道今天花了多少钱
- ❌ 看不到实时消耗，容易"上头"一直问
- ❌ 月底看到账单才惊觉"怎么这么多"

**解决方案**：

做一个状态栏插件，让你实时看到：

- ✅ **当前会话**：正在烧多少 token
- ✅ **今日统计**：今天一共用了多少、花了多少钱
- ✅ **历史总计**：从开始到现在一共烧了多少钱
- ✅ **燃烧速度**：每秒烧掉多少 token

---

## 📸 效果预览

### 状态栏显示

安装后，你的 Claude Code 状态栏会变成这样：

![预览](/blog-assets/claude-code-burn-money_where_is_my_money.png)

**解读**：

- **今日**：29.9M tokens，花费 $185.74
- **燃烧速度**：每秒 2300 tokens
- **总计**：历史累计 3.9B tokens，$1860.20

### 账单详情

在 Claude Code 中输入 `/burn-your-money` 命令：

**💸 BURN YOUR MONEY - 账单详情**

**💰 Token 价格说明**
- **Input**: $3.00 / 百万 tokens
- **Output**: $15.00 / 百万 tokens
- **Cache**: $0.30 / 百万 tokens

**📆 本周消费**
- Tokens: 12.3M
- 费用: $122.27

**🗓️ 本月消费**
- Tokens: 92.0M
- 费用: $912.07

**💰 历史总计**
- Tokens: 3.9B
- 费用: $1860.20

**🎯 有趣的统计**
- 这笔钱可以买 372 杯咖啡 ☕
- 或者 124 顿午餐 🍱
- 等于 93.0 次 ChatGPT Plus 🤖

---

## 🚀 快速安装

### 前置要求

- ✅ 已安装 Claude Code
- ✅ 已安装 Node.js

> **💡 小贴士**：如果你还没安装或不太熟悉 Claude Code，可以看看我之前写的保姆级教程：
> **《Claude Code + GLM-4.7 + Superpowers 保姆级入门教程》**
>
> 手把手教你从零开始安装并配置 Claude Code，接入免费的 GLM-4.7 模型，快速上手 AI 编程。（[阅读原文](https://zhuanlan.zhihu.com/p/1994894438053470382)）

### 一键安装

```bash
npm install -g "@winston.wan/burn-your-money"
```

### 验证安装

重启 Claude Code，状态栏显示 token 信息 = 安装成功！🎉

---

## 💡 核心功能

### 内置命令

| 命令 | 功能 |
|------|------|
| `/burn-your-money` | 查看详细账单 |
| `/burn-your-money-stats` | 查看 token 使用趋势图 |
| `/burn-your-money-export` | 导出数据（CSV 格式）|
| `/burn-your-money-uninstall` | 完全卸载插件 |


## 📊 价格说明

### Token 定价

插件显示的费用是**按照 Claude 官方定价**计算的：

| 类型 | 价格 |
|------|------|
| Input | $3 / 百万 tokens |
| Output | $15 / 百万 tokens |
| Cache | $0.30 / 百万 tokens (90% 折扣) |

> 💡 **提示**：如果你使用其他模型（如智谱 GLM-4.7），实际费用会有所不同。

---

## 🛠️ 技术特点

- ✅ **零外部依赖**：纯 Node.js 实现
- ✅ **跨平台支持**：Windows / macOS / Linux
- ✅ **实时更新**：状态栏实时显示消耗
- ✅ **开源免费**：MIT 协议

---

## 📦 开源地址

### GitHub

[https://github.com/winston-wwzhen/burn-your-money](https://github.com/winston-wwzhen/burn-your-money)

**⭐ Star 支持一下，让更多人看到！**

### npm

[https://www.npmjs.com/package/@winston.wan/burn-your-money](https://www.npmjs.com/package/@winston.wan/burn-your-money)

---

## ❓ 常见问题

### Q：为什么数据比 /stats 多？

A：本插件统计包含所有类型 token（输入、输出、缓存），更全面。

### Q：费用计算准确吗？

A：当前会话完全准确，历史统计基于官方定价估算。

### Q：如何卸载？

A：在 Claude Code 中运行 `/burn-your-money-uninstall` 即可。

---

## 💬 最后的话

**这个插件并不能减少你的 token 消耗**，它只能（显著地）升高你的血压。

但至少，现在你可以清楚地知道：
- 自己今天"烧"了多少钱
- 什么时候该收手了

**享受燃烧的感觉吧。🔥**

---

## 💡 省钱小贴士：使用智谱 GLM-4.7

### 我的实际花费

插件显示 30 天花了 $1860，但我实际只花了 **270 元**！

**怎么做到的？**

**答案：智谱 GLM 季度套餐** ✨

- ✅ 39亿 tokens，按 Claude 定价约 $1860（~13,400 人民币）
- ✅ 订阅智谱 GLM 季度套餐：**仅 270 元**
- ✅ **节省了超过 13,000 元！** 💰

### 性价比对比

| 对比项 | Claude API | 智谱 GLM 套餐 |
|--------|-----------|---------------|
| 39亿 tokens | ~$1860 | 季度套餐 270 元 |
| 折合人民币 | ~13,400 元 | 270 元 |
| 性价比 | 1x | **50x** 🚀 |

### 如何配置？

如果你还没配置智谱 GLM-4.7，可以看看我之前写的教程：

[**《Claude Code + GLM-4.7 + Superpowers 保姆级入门教程》**](https://zhuanlan.zhihu.com/p/1994894438053470382)

手把手教你从零开始安装并配置 Claude Code，接入免费的 GLM-4.7 模型。

### 🎁 立即获取智谱 GLM 套餐

**👉 [点击这里获取智谱 GLM Coding 套餐](https://www.bigmodel.cn/glm-coding?ic=IDSZ0TALCT)**

使用我的邀请链接订阅，你能享受超值价格，我也能获得一点奖励，双赢！🎉 不过最近智谱的API有些不稳定，大家按需购买吧。

**套餐优势**：
- ✅ **20+ 编程工具无缝支持**：Claude Code、Cline、OpenCode 等
- ✅ **API 直连**：告别限速，响应更快
- ✅ **性价比超高**：季度套餐，平均每天不到 3 元
- ✅ **官方保障**：智谱出品，稳定可靠

---

## 🚀 立即安装

```bash
npm install -g "@winston.wan/burn-your-money"
```

**开始监控你的 AI 消费吧！**
