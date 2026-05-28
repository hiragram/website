# Markdown Posts

Posts can be stored as Markdown files in content/posts.

The public URL is always derived from the post id:

    /posts/{id}

For migrated posts, keep the original microCMS id. A Markdown post with the
same id as a microCMS post overrides the microCMS version, so articles can be
migrated one by one without changing published URLs.

For new posts, prefer a random URL-safe id instead of deriving the id from the
title. This keeps the URL style aligned with existing microCMS articles and
allows titles to change without changing URLs.

## Frontmatter

    ---
    id: 2d866397557b
    title: Article title
    publishedAt: 2026-05-28T18:00:00+09:00
    tags:
      - 技術
      - AI
    ---

    Write Markdown here.
    HTML is also allowed when an embed or old article needs exact rendering.

id, title, and publishedAt are required. If id is omitted, the filename without
.md is used. Keep the filename and id identical for new Markdown posts.

## Export From microCMS

With API_KEY set, export existing posts into Markdown files:

    npm run export:microcms-posts

Existing files are not overwritten. To regenerate every file:

    npm run export:microcms-posts -- --overwrite

The exporter keeps the original article body as HTML inside the Markdown file.
That preserves rendering first; individual articles can be cleaned up into
plain Markdown later.
