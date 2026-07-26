import assert from "node:assert/strict";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set(
    "test",
    `${path.replaceAll("/", "-")}-${process.pid}-${Date.now()}`,
  );
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${path}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the finished personal homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Jace Wong — Intelligence &amp; Beyond<\/title>/i);
  assert.match(html, /Thinking,/);
  assert.match(html, /in progress\./);
  assert.match(html, /Hi, I(?:&apos;|&#x27;)m Jace/);
  assert.match(html, /I work in AI\./);
  assert.match(html, /keep a record of how I think/);
  assert.match(html, /read, question, build,/);
  assert.match(html, /Read the blogs/);
  assert.match(html, /Latest blogs/);
  assert.match(html, /<time dateTime="2026-07-24">24 JUL<\/time>/);
  assert.ok(
    html.indexOf("Reading against the machine") <
      html.indexOf("The edge is a moving agreement"),
    "newest blog should render first",
  );
  assert.doesNotMatch(
    html,
    /AI, systems, and the|This is my public notebook|I work with AI\.|I think beyond the model\.|<section class="home-about"|<section class="home-contact"/,
  );
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});

test("renders the writing index and article routes", async () => {
  const indexResponse = await render("/blog");
  assert.equal(indexResponse.status, 200);
  const indexHtml = await indexResponse.text();
  assert.match(indexHtml, /Blogs, in/);
  assert.match(indexHtml, /working form\./);
  assert.match(indexHtml, /Latest blogs/);
  assert.match(indexHtml, /The edge is a moving agreement/);
  assert.match(indexHtml, /Abstraction is a form of leverage/);
  assert.match(indexHtml, /Reading against the machine/);
  assert.ok(
    indexHtml.indexOf("Reading against the machine") <
      indexHtml.indexOf("Abstraction is a form of leverage"),
    "writing index should render newest first",
  );
  assert.doesNotMatch(indexHtml, /Investing|Attention is a portfolio/);

  const articleResponse = await render("/blog/the-edge-is-a-moving-agreement");
  assert.equal(articleResponse.status, 200);
  const articleHtml = await articleResponse.text();
  assert.match(articleHtml, /The edge is a moving agreement/);
  assert.match(articleHtml, /A boundary is a prompt/);
  assert.match(articleHtml, /aria-label="Table of contents"/);
  assert.match(articleHtml, /href="#a-boundary-is-a-prompt"/);
  assert.match(articleHtml, /id="a-boundary-is-a-prompt"/);
  assert.match(articleHtml, /Visual direction by Jace Wong/);
  assert.match(articleHtml, /References/);
  assert.match(articleHtml, /Attention Is All You Need/);
  assert.match(articleHtml, /href="#reference-vaswani-2017"/);

  const mathArticleResponse = await render(
    "/blog/abstraction-is-a-form-of-leverage",
  );
  assert.equal(mathArticleResponse.status, 200);
  const mathArticleHtml = await mathArticleResponse.text();
  assert.match(mathArticleHtml, /Mathematics as technology/);
  assert.match(mathArticleHtml, /The cost of elegance/);
  assert.match(mathArticleHtml, /class="article-equation"/);
  assert.match(mathArticleHtml, /katex/);
  assert.match(mathArticleHtml, /The Philosophy of Computer Science/);
});
