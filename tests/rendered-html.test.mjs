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
  assert.match(html, /AI, systems, and the/);
  assert.match(html, /questions around them\./);
  assert.match(html, /This is my public notebook/);
  assert.match(html, /Selected writing/);
  assert.match(html, /I work with AI\./);
  assert.match(html, /I think beyond the model\./);
  assert.doesNotMatch(html, /I live beyond it\.|Fields of practice|Field notes/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});

test("renders the writing index and article routes", async () => {
  const indexResponse = await render("/blog");
  assert.equal(indexResponse.status, 200);
  const indexHtml = await indexResponse.text();
  assert.match(indexHtml, /Intelligence in/);
  assert.match(indexHtml, /working form\./);
  assert.match(indexHtml, /The edge is a moving agreement/);
  assert.match(indexHtml, /Abstraction is a form of leverage/);
  assert.match(indexHtml, /Reading against the machine/);
  assert.doesNotMatch(indexHtml, /Investing|Attention is a portfolio/);

  const articleResponse = await render("/blog/the-edge-is-a-moving-agreement");
  assert.equal(articleResponse.status, 200);
  const articleHtml = await articleResponse.text();
  assert.match(articleHtml, /The edge is a moving agreement/);
  assert.match(articleHtml, /A boundary is a prompt/);
  assert.match(articleHtml, /Written by Jace Wong/);

  const mathArticleResponse = await render(
    "/blog/abstraction-is-a-form-of-leverage",
  );
  assert.equal(mathArticleResponse.status, 200);
  const mathArticleHtml = await mathArticleResponse.text();
  assert.match(mathArticleHtml, /Mathematics as technology/);
  assert.match(mathArticleHtml, /The cost of elegance/);
});
