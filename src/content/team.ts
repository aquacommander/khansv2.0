export interface Member {
  name: string;
  role: string;
  image: string;
  bio: string;
  founder?: boolean;
  tone: string;
}

export const team: Member[] = [
  {
    name: "Zain Khan",
    role: "Founder · Principal Engineer",
    image: "/media/team/zain.jpg",
    bio: "Sets the engineering standard and reviews every system that ships under the Khanstruct name.",
    founder: true,
    tone: "var(--accent)",
  },
  {
    name: "Keiichiro Suyama",
    role: "DevOps, AI & Backend Engineer",
    image: "/media/team/suyama.jpg",
    bio: "Builds the AI systems, backends, and infrastructure — from model pipelines to production deploys.",
    tone: "var(--accent-2)",
  },
  {
    name: "Akram",
    role: "Frontend Engineer & Designer",
    image: "/media/team/akram.jpg",
    bio: "Turns systems into interfaces people want to use — design, front-end craft, and interaction.",
    tone: "var(--accent-4)",
  },
  {
    name: "Charles Penn",
    role: "Network Administrator & Data Engineer",
    image: "/media/team/charles.jpg",
    bio: "Keeps the data flowing and the network solid — pipelines, warehousing, and reliable infrastructure.",
    tone: "var(--accent-3)",
  },
];
