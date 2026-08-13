import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center px-6">
        <p className="font-mono text-sm text-accent mb-4">404 — Not Found</p>
        <h1 className="font-display text-5xl md:text-6xl font-semibold mb-6">
          Page not found
        </h1>
        <p className="text-muted mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link href="/" className="btn primary">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
