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
  assert.doesNotMatch(html, /Latest blogs/);
  assert.doesNotMatch(html, /Reading against the machine/);
  assert.doesNotMatch(html, /The edge is a moving agreement/);
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
  assert.match(indexHtml, /No published notes yet\./);
  assert.doesNotMatch(indexHtml, /Latest blogs/);
  assert.doesNotMatch(indexHtml, /The edge is a moving agreement/);
  assert.doesNotMatch(indexHtml, /Abstraction is a form of leverage/);
  assert.doesNotMatch(indexHtml, /Reading against the machine/);
  assert.doesNotMatch(indexHtml, /Investing|Attention is a portfolio/);

  for (const slug of [
    "the-edge-is-a-moving-agreement",
    "abstraction-is-a-form-of-leverage",
    "reading-against-the-machine",
  ]) {
    const articleResponse = await render(`/blog/${slug}`);
    assert.equal(articleResponse.status, 404);
  }
});
