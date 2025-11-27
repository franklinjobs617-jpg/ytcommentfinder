# 🔍 FindYoutubeComments - The YouTube Comment Search Engine & AI Analyzer

> **Stop scrolling. Start finding.**
> 停止无休止的滚动，开始精准的发现。

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![YouTube API](https://img.shields.io/badge/YouTube_Data_API-v3-red)](https://developers.google.com/youtube/v3)
[![Next.js](https://img.shields.io/badge/Built_with-Next.js-black)](https://nextjs.org/)

## 📖 Introduction (简介)

**FindYoutubeComments** is a powerful tool designed to solve the "infinite scroll" problem on YouTube. Unlike traditional viewers that just load comments linearly, we prioritize **Search** and **Intelligence**.

Most users don't want to read *all* 10,000 comments; they want to find the *one* comment about a specific topic, bug, or timestamp. We use the YouTube Data API to filter comments server-side and leverage AI to summarize sentiments.

**FindYoutubeComments** 是一个旨在解决 YouTube“无限滚动”痛点的强大工具。与传统的仅线性加载评论的查看器不同，我们优先考虑**搜索**和**情报分析**。

大多数用户并不想阅读全部 10,000 条评论，他们只想找到关于特定主题、Bug 或时间戳的那**一条**评论。我们利用 YouTube Data API 在服务端过滤评论，并利用 AI 提炼情感摘要。

## 🚀 Key Features (核心功能)

| Feature | FindYoutubeComments (Us) | Native YouTube | Competitors (e.g., CommentViewer) |
| :--- | :--- | :--- | :--- |
| **Keyword Search** | ✅ **Server-side Search** (Fast & Accurate) | ❌ (Ctrl+F fails on unloaded items) | ❌ (Client-side filtering only) |
| **Search by User** | ✅ **User History Trace** (Find all comments by ID) | ❌ | ❌ |
| **Timestamp Indexing**| ✅ Auto-extract & Click-to-jump | ⚠️ Manual | ✅ |
| **AI Analysis** | ✅ **Sentiment & Summary** | ❌ | ❌ |
| **Export Data** | ✅ CSV/Excel Export | ❌ | ⚠️ Paid Only |
| **Performance** | ✅ Pagination & Caching (Redis) | ❌ Memory Hog | ⚠️ SQLite (Client heavy) |

## 🛠 Tech Stack (技术栈)

- **Frontend**: Next.js 14 (App Router), Tailwind CSS, Shadcn UI
- **Backend**: Node.js (Server Actions), YouTube Data API v3
- **Database**: Redis (Caching Layer), PostgreSQL (User Data)
- **AI Integration**: OpenAI API / Gemini API (for summaries)

## ⚡ Quick Start (快速开始)

1. **Clone the repo**
   ```bash
   git clone [https://github.com/yourusername/find-youtube-comments.git](https://github.com/yourusername/find-youtube-comments.git)
