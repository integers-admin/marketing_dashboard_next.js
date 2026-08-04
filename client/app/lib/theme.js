/*
  Brand registry for the rotating wall. Each brand carries its own
  accent palette, logo, tagline and endpoint namespace.

  Logos: Integers uses the real SVG mark. Umang & Aadar use monogram
  placeholders until their logo SVGs are dropped in (set `markSvg`).
*/
export const ROTATE_MS = 20000; // 20s per dashboard (20000)
export const TRANSITION_MS = 800;

export const BRANDS = [
  {
    id: "umang",
    name: "Umang Global",
    tagline: "Global Group · Marketing Performance",
    accent: "#58c09f",
    accent2: "#5bc7d3",
    grad: "from-[#58c09f] to-[#5bc7d3]",
    markFrom: "#58c09f",
    markTo: "#5bc7d3",
    letter: "U",
    apiBase: "",          // existing routes live at root of backend_url
  },
  {
    id: "aadar",
    name: "Aadar Ayurveda",
    tagline: "Ayurveda · Sales · Stock · Reach",
    accent: "#CFC5A0",
    accent2: "#5e8fb5",
    grad: "from-[#CFC5A0] to-[#5e8fb5]",
    markFrom: "#CFC5A0",
    markTo: "#2B5775",
    letter: "A",
    apiBase: "/aadar",
  },
  {
    id: "integers",
    name: "Integers Insights",
    tagline: "Insights · Products · Reports · Reach",
    accent: "#00cec9",
    accent2: "#0984e3",
    grad: "from-[#00cec9] to-[#0984e3]",
    markFrom: "#00cec9",
    markTo: "#0984e3",
    letter: "I",
    apiBase: "/integers",
    isIntegers: true,
  },
];
