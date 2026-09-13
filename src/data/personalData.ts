export interface SocialLink {
  platform: string;
  handle: string;
  url?: string;
  isPrivate?: boolean;
  label?: string;
}

export interface MusicArtist {
  name: string;
  genre: string;
  vibe: string;
  favoriteMood: string;
  quote: string;
}

export interface Book {
  id: string;
  title: string;
  theme: string;
  coreIdea: string;
  personalTake: string;
  keywords: string[];
}

export interface Athlete {
  name: string;
  sport: string;
  tag: string;
  number?: string;
  trait: string;
  accentColor: string;
}

export interface TechNode {
  id: string;
  name: string;
  category: 'Core' | 'Systems' | 'AI' | 'Web' | 'Product';
  level: string;
  detail: string;
}

export const personalData = {
  name: "MANPREET SINGH",
  nickname: "MANNI",
  starboyName: "STARBOY",
  title: "Creative Developer & CS Student",
  birthday: "06.07.2008",
  originYear: "2008",
  location: "CHANDIGARH",
  locationType: "CURRENTLY",
  hometown: "NAGINA",
  hometownType: "HOME",
  education: {
    degree: "B.Tech Computer Science & Engineering",
    year: "2nd Year",
    institution: "SVIET Chandigarh",
    focus: "Systems, Web Architecture, AI & Design"
  },
  community: {
    name: "SUPER 60",
    subtitle: "60 MINDS. ONE ECOSYSTEM.",
    institution: "SVIET",
    pillars: [
      { title: "Peer Intelligence", desc: "A rigorous collective of 60 disciplined thinkers and engineers pushing each other beyond limits." },
      { title: "Technical Growth", desc: "Accelerated development in software engineering, architecture, and competitive problem-solving." },
      { title: "Discipline & Culture", desc: "Consistency over intensity. Daily commitment to excellence, deep work, and high craft." },
      { title: "Healthy Competition", desc: "Mentorship and collaboration designed to sharpen every individual's edge." }
    ]
  },
  taglines: {
    opening: "SOMEWHERE BETWEEN CURIOSITY AND CHAOS.",
    heroSub: "Not a character. Just me.",
    heroSubAlt: "Curious about everything. Attached to almost nothing.",
    fashionQuote: "I don't dress for attention. I dress because style feels like another language.",
    musicQuote: "Some people listen to music. I live through it.",
    beliefQuote: "Some things don't need to be explained to be meaningful.",
    finalQuote: "Stay curious."
  },
  personalityTraits: [
    { title: "CHILL.", desc: "Unbothered by noise. Moving at an intentional pace." },
    { title: "CURIOUS.", desc: "Obsessed with figuring out how beautiful things work." },
    { title: "INDEPENDENT.", desc: "At peace travelling, thinking, and building in solitude." },
    { title: "ALWAYS EXPLORING.", desc: "Refusing to stay static. Finding new frontiers in code, sound, and thought." }
  ],
  musicArtists: [
    {
      name: "The Weeknd",
      genre: "Cinematic R&B / Synthwave",
      vibe: "Dark Luxury & Night Drive",
      favoriteMood: "Starboy & After Hours era atmospheric frequencies",
      quote: "The soundtrack to late night contemplation and creative velocity."
    },
    {
      name: "Lana Del Rey",
      genre: "Cinematic Baroque Pop",
      vibe: "Melancholic Glamour & Poetry",
      favoriteMood: "Slow cinematic soundscapes, raw lyricism, timeless grace",
      quote: "Atmospheric depth that feels like vintage cinema on 35mm film."
    },
    {
      name: "Billie Eilish",
      genre: "Alternative Minimalist Pop",
      vibe: "Sub-Bass & Intimate Whisper",
      favoriteMood: "Restrained production with seismic emotional weight",
      quote: "Minimalism where every silence hits harder than loud instruments."
    }
  ],
  books: [
    {
      id: "art-of-being-alone",
      title: "THE ART OF BEING ALONE",
      theme: "Solitude, Self-Reflection & Clarity",
      coreIdea: "Loneliness is an absence; solitude is a presence. Discovering peace in your own company.",
      personalTake: "Learning that being comfortable by yourself is the ultimate foundation of quiet confidence. When you aren't desperate for external validation, you can see the world with pure perspective.",
      keywords: ["Solitude", "Self-Awareness", "Clarity", "Inner Peace"]
    },
    {
      id: "atomic-habits",
      title: "ATOMIC HABITS",
      theme: "Consistency, Systems & 1% Compounding",
      coreIdea: "You do not rise to the level of your goals. You fall to the level of your systems.",
      personalTake: "Small, repeatable rituals compound silently into exponential growth. Whether in code, fitness, or mindset, discipline beats motivation every single day.",
      keywords: ["Discipline", "Compounding", "Systems", "Repetition"]
    }
  ],
  fashionStatements: [
    { label: "SILHOUETTE", note: "Clean architectural lines, oversized draping, structured minimalism." },
    { label: "DETAIL", note: "Heavyweight fabrics, matte textures, subtle metallic accents." },
    { label: "ATTITUDE", note: "Quiet composure. Not trying to be noticed, impossible to ignore." },
    { label: "IDENTITY", note: "Monochrome expression. Wearing confidence without loud branding." }
  ],
  techNodes: [
    { id: "c", name: "C", category: "Core", level: "Memory & Systems", detail: "Low-level foundations, pointers, performance, deterministic control." },
    { id: "cpp", name: "C++", category: "Systems", level: "High Performance", detail: "Object-oriented structures, algorithms, computational efficiency." },
    { id: "python", name: "PYTHON", category: "Core", level: "Scripting & Data", detail: "Rapid prototyping, automation, data manipulation and AI pipelines." },
    { id: "java", name: "JAVA", category: "Systems", level: "Enterprise & OOP", detail: "Robust design patterns, concurrent architectures, scalable backend fundamentals." },
    { id: "ai", name: "AI", category: "AI", level: "Intelligence Integration", detail: "Leveraging large multimodal models, embeddings, autonomous agent loops." },
    { id: "web", name: "WEB DEV", category: "Web", level: "Modern Frontend", detail: "React, TypeScript, CSS motion, WebGL/Three.js, dynamic web interfaces." },
    { id: "prompt", name: "PROMPT ENGINEERING", category: "AI", level: "Model Steering", detail: "Precise context construction, few-shot conditioning, structured model output orchestration." },
    { id: "products", name: "DIGITAL PRODUCTS", category: "Product", level: "End-to-End Build", detail: "Architecting interactive digital universes with taste, motion, and purpose." }
  ],
  athletes: [
    { name: "CHARLES LECLERC", sport: "Formula 1", tag: "F1 / PRECISION", number: "16", trait: "Qualifying magic, laser focus under pressure, relentless pursuit of perfection.", accentColor: "#E10600" },
    { name: "KIMI ANTONELLI", sport: "Formula 1", tag: "F1 / RAW SPEED", number: "12", trait: "Fearless prodigy velocity, natural racing instinct, calm under intense spotlight.", accentColor: "#00D2BE" },
    { name: "LEWIS HAMILTON", sport: "Formula 1", tag: "F1 / LEGACY", number: "44", trait: "7x World Champion resilience, cultural impact, unrelenting work ethic.", accentColor: "#B9974A" },
    { name: "SHREYAS IYER", sport: "Cricket", tag: "CRICKET / COMPOSURE", number: "96", trait: "Calculated aggression in the middle order, tactical captaincy, steady nerves.", accentColor: "#1E88E5" },
    { name: "NEYMAR", sport: "Football", tag: "FOOTBALL / CREATIVITY", number: "10", trait: "Pure artistic flair, improvisation, turning sport into high-wire ballet.", accentColor: "#FDD835" },
    { name: "LAMINE YAMAL", sport: "Football", tag: "FOOTBALL / FEARLESS", number: "19", trait: "Generational vision, effortless balance, rewriting records at 17.", accentColor: "#7B1FA2" },
    { name: "CRISTIANO RONALDO", sport: "Football", tag: "FOOTBALL / DISCIPLINE", number: "7", trait: "Uncompromising physical mastery, obsessiveness, undeniable standard of greatness.", accentColor: "#E53935" }
  ],
  travelWaypoints: [
    { city: "CHANDIGARH", status: "CURRENT BASE", coords: "30.7333° N, 76.7794° E", context: "Engineering studies, city of open architecture, campus ecosystem." },
    { city: "NAGINA", status: "ROOTS & HOME", coords: "29.4442° N, 78.4312° E", context: "Quiet origins, foundation, where the introspective journey begins." }
  ],
  socialLinks: [
    {
      platform: "Instagram",
      handle: "@thmnprt",
      url: "https://www.instagram.com/thmnprt/?hl=en",
      label: "PUBLIC ARCHIVE"
    },
    {
      platform: "Instagram",
      handle: "@mnprt.404",
      isPrivate: true,
      label: "PRIVATE ARCHIVE"
    },
    {
      platform: "Snapchat",
      handle: "@thmnprt",
      url: "https://www.snapchat.com/add/thmnprt?share_id=GYPMvvLhJSw&locale=en-IN",
      label: "MOMENTS"
    }
  ],
  easterEggs: {
    starboyClicksTrigger: 3,
    starboyKeycode: "STARBOY",
    birthdayHoverSeconds: 2.5
  },
  musicAudioReference: {
    url: "https://youtu.be/LiXIoqGXfh8?si=vFqzw1r1NF7voC6p",
    videoId: "LiXIoqGXfh8",
    trackName: "Timeless (Instrumental)",
    artist: "The Weeknd & Playboi Carti"
  }
};
