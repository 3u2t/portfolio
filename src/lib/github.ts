export type GithubRepo = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  updated_at: string;
};

const USER = "3u2t";

export async function getGithubRepos(): Promise<GithubRepo[] | null> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${USER}/repos?per_page=12&sort=updated`,
      { next: { revalidate: 3600 }, headers: { Accept: "application/vnd.github+json" } }
    );
    if (!res.ok) return null;
    const data = (await res.json()) as GithubRepo[];
    return data
      .filter((r) => !r.name.endsWith(".github.io"))
      .slice(0, 6)
      .map((r) => ({
        id: r.id,
        name: r.name,
        html_url: r.html_url,
        description: r.description,
        language: r.language,
        stargazers_count: r.stargazers_count,
        updated_at: r.updated_at,
      }));
  } catch {
    return null;
  }
}
