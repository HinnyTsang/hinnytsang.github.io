// ─── Types ───────────────────────────────────────────────────────────────────

export type SocialLink = {
  platform: string;
  url: string;
};

export type EducationItem = {
  id: string;
};

export type CareerItem = {
  id: string;
  emoji: string;
  direction: "left" | "right";
};

export type SkillGroup = {
  title: string;
  items: string[];
};

// ─── Profile (locale-independent) ────────────────────────────────────────────

export const profile = {
  firstName: "Man Hin",
  lastName: "Tsang",
  nickname: "Hinny",
  email: "hinnytsang@gmail.com",
} as const;

export const socialLinks: SocialLink[] = [
  { platform: "GitHub", url: "https://github.com/HinnyTsang" },
  { platform: "LinkedIn", url: "https://linkedin.com/in/HinnyTsang" },
  { platform: "Telegram", url: "https://t.me/Htokra" },
];

// ─── Sections (order = display order, IDs used for i18n key lookup) ──────────

export const educationItems: EducationItem[] = [
  { id: "hkust" },
  { id: "cuhk" },
  { id: "uva" },
  { id: "wqu" },
];

export const careerItems: CareerItem[] = [
  { id: "oursky", emoji: "🏗️", direction: "right" },
  { id: "smartone", emoji: "📡", direction: "left" },
  { id: "pollock", emoji: "📈", direction: "right" },
];

// ─── Skills (not translated — tool/tech names are universal) ─────────────────

export const skills: SkillGroup[] = [
  {
    title: "Python & Data Stack",
    items: [
      "LangChain",
      "RAG",
      "Policy Agents",
      "Pandas",
      "Polars",
      "NumPy",
      "SciPy",
      "scikit-learn",
      "XGBoost",
      "LightGBM",
      "TensorFlow",
      "PySpark",
      "LLM APIs",
      "MLflow",
    ],
  },
  {
    title: "Full-Stack Development",
    items: [
      "React",
      "TypeScript",
      "FastAPI",
      "Streamlit",
      "RDBMS (PostgreSQL)",
      "NoSQL (MongoDB)",
      "Object Storage (AWS S3, MinIO, AliCloud OSS)",
      "Redis",
      "RESTful APIs",
      "WebSockets",
      "SSE",
    ],
  },
  {
    title: "Quant & Research Infrastructure",
    items: [
      "Bloomberg SAPI & BQL",
      "Binance, OKX, Polymarket API",
      "FIX",
      "Apache Airflow",
      "Apache Spark",
      "RabbitMQ",
      "Backtesting",
      "Portfolio Optimization",
    ],
  },
  {
    title: "Infrastructure & DevOps",
    items: ["Linux", "Docker", "Kubernetes", "Git", "CI/CD", "AWS", "AliCloud", "C++"],
  },
];
