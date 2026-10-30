// ─── "Currently building". TO UPDATE: edit this array. ─────────
// Keep entries short and honest. status: "active" | "ongoing" | "learning"

export type NowItem = {
  title: string;
  detail: string;
  status: "active" | "ongoing" | "learning";
};

export const nowItems: NowItem[] = [
  {
    title: "web projects",
    detail: "Building and maintaining useful projects.",
    status: "ongoing",
  },
  {
    title: "hands-on learning",
    detail: "Exploring Linux and networking through experiments.",
    status: "ongoing",
  },
  {
    title: "AI coding workflow",
    detail: "Testing OpenCode + assistants in VS Code, staying in control of the code.",
    status: "active",
  },
  {
    title: "Fedora setup",
    detail: "Daily-driver tweaks and a cleaner dev workflow on Linux.",
    status: "learning",
  },
];
