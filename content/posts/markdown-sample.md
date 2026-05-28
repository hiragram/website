---
id: markdown-sample
title: Markdown投稿サンプル
publishedAt: 2026-05-28T18:30:00+09:00
tags:
  - 技術
  - TIL
---

Markdownで書いた記事が、既存の記事一覧・詳細ページ・RSSに同じ形で表示されるかを確認するためのサンプルです。

## 確認したいこと

- URLが /posts/markdown-sample になる
- 一覧に公開日時とタグが出る
- 詳細ページでMarkdown本文がHTMLとして表示される
- RSSにも同じ記事が含まれる

コードブロックの表示確認:

言語指定なし:

```
npm run build
```

TypeScript:

```ts
const source = 'markdown';
console.log('post source: ' + source);
```

HTMLも必要なときは、そのまま書けます。

<blockquote>
  <p>microCMSから移行した記事のHTMLを残したい場合の確認用です。</p>
</blockquote>
