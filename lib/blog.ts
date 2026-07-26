export type PostInline =
  | string
  | { type: "link"; text: string; href: string }
  | { type: "citation"; reference: string };

export type PostBlock =
  | { type: "paragraph"; text: string }
  | { type: "rich-paragraph"; content: PostInline[] }
  | { type: "heading"; text: string }
  | { type: "quote"; text: string }
  | {
      type: "figure";
      src: string;
      alt: string;
      width: number;
      height: number;
      caption: string;
      credit?: { text: string; href: string };
    }
  | {
      type: "equation";
      latex: string;
      label?: string;
      caption?: string;
    }
  | { type: "note"; label: string; text: string };

export type PostReference = {
  id: string;
  authors: string;
  title: string;
  source: string;
  year: string;
  href: string;
};

export type Post = {
  slug: string;
  status: "draft" | "published";
  number: string;
  title: string;
  dek: string;
  category: string;
  publishedAt: string;
  date: string;
  timelineDate: string;
  readingTime: string;
  accent: string;
  blocks: PostBlock[];
  references: PostReference[];
};

const archive: Post[] = [
  {
    slug: "the-edge-is-a-moving-agreement",
    status: "draft",
    number: "001",
    title: "The edge is a moving agreement",
    dek: "What looks like a technical limit is often a temporary agreement between tools, language, and imagination.",
    category: "Artificial Intelligence",
    publishedAt: "2026-07-10",
    date: "July 10, 2026",
    timelineDate: "10 JUL",
    readingTime: "6 min",
    accent: "violet",
    blocks: [
      {
        type: "paragraph",
        text: "We talk about the edge of artificial intelligence as if it were a coastline: a clean division between what machines can do and what remains ours. But coastlines move. The tide changes, the map is redrawn, and what seemed permanent turns out to be a temporary arrangement.",
      },
      {
        type: "rich-paragraph",
        content: [
          "The most interesting work in AI does not begin with asking whether a model can cross a benchmark. It begins by noticing that the benchmark itself encodes yesterday’s imagination. The history from the Transformer ",
          { type: "citation", reference: "vaswani-2017" },
          " to foundation models ",
          { type: "citation", reference: "bommasani-2021" },
          " is also a history of changing interfaces, scales, and questions.",
        ],
      },
      {
        type: "figure",
        src: "/og.png",
        alt: "Jace Wong Intelligence and Beyond visual field map",
        width: 1731,
        height: 909,
        caption:
          "A working field map: intelligence as an orbit of tools, questions, and changing boundaries.",
        credit: {
          text: "Visual direction by Jace Wong",
          href: "https://github.com/JaceWong-ai",
        },
      },
      {
        type: "heading",
        text: "A boundary is a prompt",
      },
      {
        type: "paragraph",
        text: "Every boundary says two things at once: stop here, and look closer. The first is operational. The second is philosophical. In practice, progress comes from learning to hear both.",
      },
      {
        type: "quote",
        text: "The edge is not where intelligence ends. It is where our description of intelligence becomes insufficient.",
      },
      {
        type: "paragraph",
        text: "This is why I am drawn to systems that leave room for surprise. Reliability matters; so does legibility. But after those foundations, there should still be a door through which the unexpected can enter. A useful tool answers the question. A generative tool quietly changes the person asking it.",
      },
      {
        type: "note",
        label: "Field note",
        text: "A benchmark is evidence about a system under a particular protocol—not a permanent map of intelligence.",
      },
      {
        type: "heading",
        text: "Work at the border",
      },
      {
        type: "paragraph",
        text: "To work at the border is to resist two easy stories: that AI is merely automation, and that it is an autonomous destiny. It is neither. It is a medium—one whose consequences depend on what we choose to notice, reward, and build around it.",
      },
      {
        type: "paragraph",
        text: "The edge moves when tools improve. More importantly, it moves when our questions do. That is the frontier worth paying attention to.",
      },
    ],
    references: [
      {
        id: "vaswani-2017",
        authors: "Vaswani, A. et al.",
        title: "Attention Is All You Need",
        source: "arXiv",
        year: "2017",
        href: "https://arxiv.org/abs/1706.03762",
      },
      {
        id: "bommasani-2021",
        authors: "Bommasani, R. et al.",
        title: "On the Opportunities and Risks of Foundation Models",
        source: "Stanford CRFM / arXiv",
        year: "2021",
        href: "https://arxiv.org/abs/2108.07258",
      },
    ],
  },
  {
    slug: "abstraction-is-a-form-of-leverage",
    status: "draft",
    number: "002",
    title: "Abstraction is a form of leverage",
    dek: "Every useful abstraction hides detail. The art is deciding what can disappear without losing the truth.",
    category: "Technology & Mathematics",
    publishedAt: "2026-07-18",
    date: "July 18, 2026",
    timelineDate: "18 JUL",
    readingTime: "6 min",
    accent: "amber",
    blocks: [
      {
        type: "paragraph",
        text: "A line of code can move a machine because layers of difficult detail have already been compressed beneath it. A mathematical symbol can hold an entire family of relationships in a single mark. Abstraction gives thought leverage: it lets a small gesture act on a much larger structure.",
      },
      {
        type: "paragraph",
        text: "But every abstraction is also a decision about what not to see. An interface hides an implementation. A model hides variation. A theorem hides the failed paths that made the proof possible. What disappears is often what makes the abstraction useful—and sometimes what makes it dangerous.",
      },
      {
        type: "heading",
        text: "Mathematics as technology",
      },
      {
        type: "rich-paragraph",
        content: [
          "Mathematics makes patterns portable. Once a relation can be named, it can travel between physics, computation, economics, and any domain willing to preserve its structure. Computer science turns this movement into an explicit hierarchy of levels ",
          { type: "citation", reference: "sep-computer-science" },
          ".",
        ],
      },
      {
        type: "equation",
        latex:
          String.raw`\mathcal{A}(x)=g(f(x)),\qquad f:X\to Z,\quad g:Z\to Y`,
        label: "01",
        caption:
          "An abstraction maps a detailed space X into a useful representation Z before acting in Y.",
      },
      {
        type: "quote",
        text: "An abstraction is powerful when it forgets the right things.",
      },
      {
        type: "paragraph",
        text: "This is why notation matters. Good notation does more than shorten an explanation; it changes which thoughts are easy to have. The distance between an idea and an implementation often depends on whether we have found the right representation.",
      },
      {
        type: "heading",
        text: "The cost of elegance",
      },
      {
        type: "paragraph",
        text: "Elegant systems create the feeling that complexity has vanished. It has not. It has been moved. The responsible builder keeps track of where it went, who now carries it, and which edge cases were excluded to make the center feel simple.",
      },
      {
        type: "paragraph",
        text: "The goal is not to avoid abstraction; thinking without it is impossible. The goal is to move fluently between the clean surface and the difficult machinery beneath it—to know when the map is enough, and when the terrain is asking to be seen.",
      },
    ],
    references: [
      {
        id: "sep-computer-science",
        authors: "Turner, R. & Angius, N.",
        title: "The Philosophy of Computer Science",
        source: "Stanford Encyclopedia of Philosophy",
        year: "2025",
        href: "https://plato.stanford.edu/entries/computer-science/",
      },
    ],
  },
  {
    slug: "reading-against-the-machine",
    status: "draft",
    number: "003",
    title: "Reading against the machine",
    dek: "In an age of instant synthesis, slow reading becomes a way to preserve intellectual texture.",
    category: "Reading & Thought",
    publishedAt: "2026-07-24",
    date: "July 24, 2026",
    timelineDate: "24 JUL",
    readingTime: "5 min",
    accent: "cyan",
    blocks: [
      {
        type: "paragraph",
        text: "A machine can now summarize in seconds what takes us hours to read. This is useful. It is also a temptation to mistake the transfer of information for the formation of thought.",
      },
      {
        type: "paragraph",
        text: "A summary gives us the shape of an argument. Reading gives us its weather: the hesitation, the rhythm, the examples that refuse to compress, the sentence that alters the meaning of the one before it. Information survives compression better than experience does.",
      },
      {
        type: "heading",
        text: "Friction has a function",
      },
      {
        type: "rich-paragraph",
        content: [
          "The difficulty of a book is not always a defect waiting to be optimized away. Sometimes friction is the mechanism. Research on print exposure describes a reinforcing relationship between reading practice and comprehension ",
          { type: "citation", reference: "mol-bus-2011" },
          ".",
        ],
      },
      {
        type: "quote",
        text: "To read slowly is to let another mind change the pace of your own.",
      },
      {
        type: "paragraph",
        text: "This does not make AI the enemy of reading. The better relationship is asymmetric: use machines to widen the field, then choose where to go deep without them. Let synthesis reveal the map; let attention decide where to walk.",
      },
      {
        type: "heading",
        text: "Keep the long path",
      },
      {
        type: "paragraph",
        text: "The future will make many cognitive shortcuts abundant. That abundance increases the value of knowing when not to take one. A person who can move quickly and still choose slowness holds an unusual advantage.",
      },
      {
        type: "paragraph",
        text: "I read not because information is scarce, but because interiority is. The long path leaves traces that no summary can reproduce.",
      },
    ],
    references: [
      {
        id: "mol-bus-2011",
        authors: "Mol, S. E. & Bus, A. G.",
        title:
          "To read or not to read: a meta-analysis of print exposure from infancy to early adulthood",
        source: "Psychological Bulletin / PubMed",
        year: "2011",
        href: "https://pubmed.ncbi.nlm.nih.gov/21219054/",
      },
    ],
  },
];

// Drafts stay in source as references for future writing, but are not exposed
// through public lists, metadata, static routes, or article navigation.
export const draftPosts = archive
  .filter((post) => post.status === "draft")
  .sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );

export const posts = archive.filter((post) => post.status === "published").sort(
  (a, b) =>
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
);

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}

export function headingId(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
