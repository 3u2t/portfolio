import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Tom — Developer & Homelab",
    short_name: "Tom",
    description:
      "Developer and technology enthusiast from Germany. Web apps, Raspberry Pi home server, Linux.",
    start_url: "/",
    display: "standalone",
    background_color: "#09090b",
    theme_color: "#09090b",
    icons: [{ src: "/favicon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
