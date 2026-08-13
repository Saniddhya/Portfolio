export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center" role="status" aria-label="Loading">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-line border-t-accent rounded-full animate-spin" />
        <span className="font-mono text-xs text-muted">Loading…</span>
      </div>
    </div>
  );
}