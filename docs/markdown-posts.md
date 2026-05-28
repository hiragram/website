# Markdown Posts

Posts can be stored as Markdown files in content/posts.

The public URL is always derived from the post id:

    /posts/{id}

For migrated posts, keep the original microCMS id. A Markdown post with the
same id as a microCMS post overrides the microCMS version, so articles can be
migrated one by one without changing published URLs.

For new posts, omit id and use a readable filename. The public URL id is derived
from the filename with the first 12 hex characters of sha256(filename without
.md). This keeps filenames readable while making URLs look similar to existing
microCMS articles.

## Frontmatter

    ---
    title: Article title
    publishedAt: 2026-05-28T18:00:00+09:00
    tags:
      - 技術
      - AI
    ---

    Write Markdown here.
    HTML is also allowed when an embed or old article needs exact rendering.

title and publishedAt are required. id is optional. Use id when migrating a
microCMS article or when a URL must be pinned exactly. Otherwise, omit id and
let the filename hash decide the URL.

For example, content/posts/markdown-sample.md becomes:

    /posts/4efb0c1728c6

## Export From microCMS

With API_KEY set, export existing posts into Markdown files:

    npm run export:microcms-posts

Existing files are not overwritten. To regenerate every file:

    npm run export:microcms-posts -- --overwrite

The exporter keeps the original article body as HTML inside the Markdown file.
That preserves rendering first; individual articles can be cleaned up into
plain Markdown later.
