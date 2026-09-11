// ─── "Currently building". TO UPDATE: edit this array. ─────────
// Keep entries short and honest. status: "active" | "ongoing" | "learning"

export type NowItem = {
  title: string;
  detail: string;
  status: "active" | "ongoing" | "learning";
};

export const nowItems: NowItem[] = [
  {
    title: "four04.de ecosystem",
    detail: "Small web projects + Tunnel/Docker setup, kept tidy.",
    status: "ongoing",
  },
  {
    title: "Pi home server",
    detail: "Updates, storage, and keeping self-hosted apps healthy.",
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
