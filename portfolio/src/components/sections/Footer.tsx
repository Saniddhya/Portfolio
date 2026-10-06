import { profile } from "@/data/profile";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="no-print border-t border-line py-10">
      <div className="container flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="mono text-[10px] text-muted-2">
          © {year} {profile.name}
        </p>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <span className="mono text-[10px] text-muted-2">{profile.site}</span>
          <a
            href="https://github.com/saniddhya"
            target="_blank"
            rel="noopener noreferrer"
            className="mono link-line text-[10px] text-muted-2"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/sanidhya-rathore-377a99226"
            target="_blank"
            rel="noopener noreferrer"
            className="mono link-line text-[10px] text-muted-2"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}