export type PostBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "quote"; text: string };

export type Post = {
  slug: string;
  number: string;
  title: string;
  dek: string;
  category: string;
  date: string;
  readingTime: string;
  accent: string;
  blocks: PostBlock[];
};

export const posts: Post[] = [
  {
    slug: "the-edge-is-a-moving-agreement",
    number: "001",
    title: "The edge is a moving agreement",
    dek: "What looks like a technical limit is often a temporary agreement between tools, language, and imagination.",
    category: "Artificial Intelligence",
    date: "July 24, 2026",
    readingTime: "6 min",
    accent: "violet",
    blocks: [
      {
        type: "paragraph",
        text: "We talk about the edge of artificial intelligence as if it were a coastline: a clean division between what machines can do and what remains ours. But coastlines move. The tide changes, the map is redrawn, and what seemed permanent turns out to be a temporary arrangement.",
      },
      {
        type: "paragraph",
        text: "The most interesting work in AI does not begin with asking whether a model can cross a benchmark. It begins by noticing that the benchmark itself encodes yesterday’s imagination. A capability is not only discovered; it is also invited into existence by the quality of the question, the shape of the interface, and the patience of the person exploring it.",
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
  },
  {
    slug: "attention-is-a-portfolio",
    number: "002",
    title: "Attention is a portfolio",
    dek: "Before we allocate capital, we allocate awareness. The first portfolio compounds into the second.",
    category: "Philosophy × Investing",
    date: "July 24, 2026",
    readingTime: "5 min",
    accent: "amber",
    blocks: [
      {
        type: "paragraph",
        text: "Investing is usually described as the allocation of capital under uncertainty. The definition is accurate, but incomplete. Long before money moves, attention does. We decide which changes deserve observation, which ideas deserve study, and which signals deserve patience.",
      },
      {
        type: "paragraph",
        text: "Seen this way, attention is the first portfolio. It has positions, concentrations, opportunity costs, and a time horizon. It can be diversified until it means nothing, or concentrated until the world outside the thesis disappears.",
      },
      {
        type: "heading",
        text: "What compounds before money",
      },
      {
        type: "paragraph",
        text: "A well-placed hour rarely announces its return. Reading a difficult book, following a technical shift, or understanding a company from first principles may look unproductive for a long time. Then one day, several quiet observations connect. The return arrives all at once, but the compounding did not.",
      },
      {
        type: "quote",
        text: "What we repeatedly notice becomes the world we are capable of acting in.",
      },
      {
        type: "paragraph",
        text: "This is also why the loudest information is so expensive. It does not merely consume time; it changes the composition of the portfolio. A day spent reacting is a day not spent building a view.",
      },
      {
        type: "heading",
        text: "Conviction without closure",
      },
      {
        type: "paragraph",
        text: "Good investing needs conviction, but conviction is not the same as certainty. It is a willingness to act while keeping the model revisable. The same is true of a life of ideas: commit deeply, update honestly, and never confuse consistency with truth.",
      },
      {
        type: "paragraph",
        text: "Capital follows attention. The more important question is whether our attention is already invested in the future we claim to believe in.",
      },
    ],
  },
  {
    slug: "reading-against-the-machine",
    number: "003",
    title: "Reading against the machine",
    dek: "In an age of instant synthesis, slow reading becomes a way to preserve intellectual texture.",
    category: "Reading & Thought",
    date: "July 24, 2026",
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
        type: "paragraph",
        text: "The difficulty of a book is not always a defect waiting to be optimized away. Sometimes friction is the mechanism. It slows the mind enough for unfamiliar structures to take hold.",
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
  },
];

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}
