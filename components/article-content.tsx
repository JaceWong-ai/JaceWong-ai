import Image from "next/image";
import katex from "katex";
import type { ReactNode } from "react";
import { headingId, type Post, type PostInline } from "@/lib/blog";

type ArticleContentProps = {
  post: Post;
};

function renderInline(
  content: PostInline[],
  post: Post,
): ReactNode[] {
  return content.map((item, index) => {
    if (typeof item === "string") return item;

    if (item.type === "link") {
      return (
        <a
          className="article-inline-link"
          href={item.href}
          key={`${item.href}-${index}`}
          target="_blank"
          rel="noreferrer"
        >
          {item.text} ↗
        </a>
      );
    }

    const referenceIndex = post.references.findIndex(
      (reference) => reference.id === item.reference,
    );
    const reference = post.references[referenceIndex];

    return (
      <sup className="article-citation" key={`${item.reference}-${index}`}>
        <a
          href={`#reference-${item.reference}`}
          aria-label={`See reference ${referenceIndex + 1}: ${reference?.title ?? item.reference}`}
        >
          [{referenceIndex + 1}]
        </a>
      </sup>
    );
  });
}

export function ArticleContent({ post }: ArticleContentProps) {
  return (
    <div className="article-body">
      {post.blocks.map((block, index) => {
        if (block.type === "heading") {
          return (
            <h2 id={headingId(block.text)} key={index}>
              {block.text}
            </h2>
          );
        }

        if (block.type === "quote") {
          return (
            <blockquote key={index}>
              <span>“</span>
              {block.text}
            </blockquote>
          );
        }

        if (block.type === "rich-paragraph") {
          return <p key={index}>{renderInline(block.content, post)}</p>;
        }

        if (block.type === "figure") {
          return (
            <figure className="article-figure" key={index}>
              <div>
                <Image
                  src={block.src}
                  alt={block.alt}
                  width={block.width}
                  height={block.height}
                  sizes="(max-width: 820px) 100vw, 920px"
                  unoptimized
                />
              </div>
              <figcaption>
                <span>Fig. {String(index + 1).padStart(2, "0")}</span>
                <p>{block.caption}</p>
                {block.credit ? (
                  <a
                    href={block.credit.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {block.credit.text} ↗
                  </a>
                ) : null}
              </figcaption>
            </figure>
          );
        }

        if (block.type === "equation") {
          const renderedEquation = katex.renderToString(block.latex, {
            displayMode: true,
            throwOnError: false,
            output: "htmlAndMathml",
          });

          return (
            <figure className="article-equation" key={index}>
              <div className="equation-label">
                <span>Equation</span>
                <i>{block.label ?? String(index + 1).padStart(2, "0")}</i>
              </div>
              <div
                className="equation-render"
                dangerouslySetInnerHTML={{ __html: renderedEquation }}
              />
              {block.caption ? <figcaption>{block.caption}</figcaption> : null}
            </figure>
          );
        }

        if (block.type === "note") {
          return (
            <aside className="article-note" key={index}>
              <span>{block.label}</span>
              <p>{block.text}</p>
            </aside>
          );
        }

        return <p key={index}>{block.text}</p>;
      })}

      {post.references.length ? (
        <section className="article-references" aria-labelledby="references">
          <header>
            <p>Sources</p>
            <h2 id="references">References</h2>
          </header>
          <ol>
            {post.references.map((reference, index) => (
              <li id={`reference-${reference.id}`} key={reference.id}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <p>
                    {reference.authors} ({reference.year})
                  </p>
                  <a
                    href={reference.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {reference.title} ↗
                  </a>
                  <i>{reference.source}</i>
                </div>
              </li>
            ))}
          </ol>
        </section>
      ) : null}
    </div>
  );
}
