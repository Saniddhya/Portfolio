/**
 * GitHub data layer.
 *
 * Public REST endpoints only — no credentials are ever sent from the browser.
 * All fetching happens server-side with revalidation caching, so a visitor
 * never hits GitHub's rate limit directly.
 */

export const GITHUB_USER = "Saniddhya";
export const GITHUB_PROFILE_URL = `https://www.github.com/Saniddhya`;

/** Minimal shape of a repository we actually consume. */
export interface GitHubRepo {
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics: string[];
  fork: boolean;
  archived: boolean;
  is_template: boolean;
  size: number;
  stargazers_count: number;
  forks_count: number;
  created_at: string;
  updated_at: string;
  pushed_at: string;
}

export interface GitHubProfile {
  login: string;
  name: string | null;
  bio: string | null;
  blog: string | null;
  public_repos: number;
  followers: number;
  created_at: string;
}

const API = "https://api.github.com";
const UA = "sanidhya-portfolio";

/** One hour. Long enough to be cheap, short enough to stay current. */
const REVALIDATE = 3600;

async function ghFetch<T>(path: string, revalidate: number): Promise<T | null> {
  try {
    const res = await fetch(`${API}${path}`, {
      headers: { Accept: "application/vnd.github+json", "User-Agent": UA },
      next: { revalidate },
    });

    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    // Network failure or malformed response — callers fall back to curated data.
    return null;
  }
}

export function getProfile(): Promise<GitHubProfile | null> {
  return ghFetch<GitHubProfile>(`/users/${GITHUB_USER}`, REVALIDATE);
}

export function getRepos(): Promise<GitHubRepo[] | null> {
  return ghFetch<GitHubRepo[]>(`/users/${GITHUB_USER}/repos?per_page=100&sort=pushed`, REVALIDATE);
}