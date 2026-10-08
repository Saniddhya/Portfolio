import { getProfile, getRepos } from "@/lib/github";
import type { GitHubProfile } from "@/lib/github";

/** A curated project enriched with whatever GitHub knows about its repo. */
export interface LiveProject {
  name: string;
  slug: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stars: number;
  pushed_at: string;
}

export interface ActivitySnapshot {
  /** Newest push dates across public repos, most recent first. */
  recentRepos: LiveProject[];
  languages: { language: string; count: number }[];
  totalRepos: number;
  /** False when GitHub was unreachable and we fell back to nothing. */
  live: boolean;
}

/**
 * Repo names are awkward as slugs (trailing dashes, mixed case), so match on a
 * normalised key rather than a hand-maintained mapping that will silently rot.
 */
function normalize(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

/**
 * Builds the "Building in public" snapshot.
 *
 * Every failure path returns an empty-but-valid snapshot with `live: false`, so
 * the UI renders a quiet placeholder instead of an error. Forks, templates, and
 * archived repos are excluded — they are not the person's own work.
 */
export async function getActivity(): Promise<ActivitySnapshot> {
  const repos = await getRepos();

  if (!repos || repos.length === 0) {
    return { recentRepos: [], languages: [], totalRepos: 0, live: false };
  }

  const own = repos.filter((r) => !r.fork && !r.is_template && !r.archived);

  const recentRepos: LiveProject[] = own
    .slice()
    .sort((a, b) => Date.parse(b.pushed_at) - Date.parse(a.pushed_at))
    .slice(0, 6)
    .map((r) => ({
      name: r.name,
      slug: normalize(r.name),
      description: r.description,
      html_url: r.html_url,
      homepage: r.homepage && r.homepage.trim() ? r.homepage.trim() : null,
      language: r.language,
      stars: r.stargazers_count,
      pushed_at: r.pushed_at,
    }));

  const counts = new Map<string, number>();
  for (const r of own) {
    if (r.language) counts.set(r.language, (counts.get(r.language) ?? 0) + 1);
  }

  const languages = [...counts.entries()]
    .map(([language, count]) => ({ language, count }))
    .sort((a, b) => b.count - a.count);

  return { recentRepos, languages, totalRepos: own.length, live: true };
}

export async function getGitHubProfile(): Promise<GitHubProfile | null> {
  return getProfile();
}