import type { CSSProperties } from "react";

type RevealWordsProps = {
  text: string;
  className?: string;
  auto?: boolean;
  delay?: number;
};

export function RevealWords({
  text,
  className = "",
  auto = false,
  delay = 0,
}: RevealWordsProps) {
  return (
    <span
      className={`reveal-words ${auto ? "is-visible is-auto" : ""} ${className}`.trim()}
      data-reveal-words={auto ? undefined : ""}
      aria-label={text}
      style={
        {
          "--reveal-delay": `${delay}ms`,
        } as CSSProperties
      }
    >
      {text.split(" ").map((word, index) => (
        <span key={`${word}-${index}`}>
          <span className="word-clip" aria-hidden="true">
            <span
              style={
                {
                  "--word-index": index,
                } as CSSProperties
              }
            >
              {word}
            </span>
          </span>{" "}
        </span>
      ))}
    </span>
  );
}
