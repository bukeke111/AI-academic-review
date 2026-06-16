# ARGP — AI Academic Review & Governance Platform

高校批次化学术项目评审与治理平台 **交互 Demo**（纯前端 Mock）。

覆盖学生申报、导师审阅、秘书处受理、专家评审、答辩评分、立项公示、异议与申诉等完整链路，并集成 **AI 辅助写作 · 质量自检 · 答辩预演**。

[![Demo](https://img.shields.io/badge/Demo-在线体验-blue)](https://github.com/bukeke111/AI-academic-review)
[![License](https://img.shields.io/badge/License-MIT-lightgrey)](#)
[![Stack](https://img.shields.io/badge/Stack-HTML%20%2F%20CSS%20%2F%20JS-orange)](#)

---

## 为什么做这个项目

传统高校项目评审系统擅长流程，但缺少 **AI 提效** 与 **跨批次治理洞察**。ARGP 探索一条两步路径：

1. **先建立信任** — 流程管理不输传统系统，AI 自检为导师与秘书处省时间  
2. **再建立壁垒** — 依托图谱与数据积累，做偏差检测、传承分析、自然语言治理查询  

本仓库为 **可演示的产品原型**，用于需求验证、售前 Demo 与交互设计评审。

---

## 功能概览

| 角色 | 能力 |
|------|------|
| **学生** | 项目申报、AI 写作/质检、答辩预演、我的项目、公示异议 |
| **导师** | 材料审阅、批注退回、指导学生项目 |
| **秘书处** | 受理台、进度监控、退件、异议与申诉工作台 |
| **专家** | 线上评审、利益冲突回避、答辩评分 |
| **评审组长** | 答辩组织、结果确认 |

### 近期亮点

- 秘书处 **退件** 与学生端待办联动  
- **评审结果申诉** 与 **公示期异议** 统一在项目详情「争议与申诉」Tab  
- **AI 答辩助手** 支持答辩前 **预演模式**（预测问题、准备清单）  
- 专家 **利益冲突回避** 与秘书处统一处置  
- 消息中心多级引导（流程 / 公示 / 异议）

更多说明见 [RELEASE_v1.0.0.md](./RELEASE_v1.0.0.md)。

---

## 快速开始

```bash
git clone https://github.com/bukeke111/AI-academic-review.git
cd AI-academic-review
python3 -m http.server 8765
```

| 入口 | 地址 |
|------|------|
| 登录 | http://localhost:8765/login.html |
| 学生端 | http://localhost:8765/index.html |
| 评审端 | http://localhost:8765/review.html |

> 纯前端 Mock，数据存于浏览器内存 / `localStorage`，刷新后部分状态可能重置。

---

## 推荐演示路径

| 场景 | 操作 |
|------|------|
| 学生 AI 质检 | 学生登录 → 项目申请 → AI 自检 → 提交导师 |
| 秘书处退件 | 学生 → `PROJ-2026-0099` → 按退件说明修改 |
| 结果申诉 | 我的项目 → `PROJ-2026-0078` → 争议与申诉 Tab |
| 公示异议 | 立项公示 → 他人项目详情 → 公示结果 → 提出异议 |
| 答辩预演 | 我的项目 → `PROJ-2026-0087` → 答辩预演 / AI 助手 |
| 秘书处处置 | 评审端秘书处 → 异议与申诉 |

---

## 项目结构

```
login.html              # 统一登录
index.html              # 学生端
review.html             # 秘书处 / 专家 / 答辩端
governance.html         # 治理视图（Demo）
argp-mock-data.js       # 项目与状态数据
argp-mock-ai.js         # AI 助手（写作 / 质检 / 答辩）
argp-mock-appeal.js     # 异议与申诉
argp-mock-secretary.js  # 秘书处工作台
argp-mock-expert.js     # 专家评审与回避
argp-mock-mentor.js     # 导师审阅
argp-mock-messages.js   # 消息中心
argp-theme.css          # 主题与组件样式
```

---

## 作者

**Claire** ([@bukeke111](https://github.com/bukeke111)) — 教育科技 / 产品原型 / AI + 流程治理

---

## 说明

本仓库为 **演示原型**，非生产环境代码。AI 能力均为 Mock，标注「AI 生成 · 仅供参考」。
