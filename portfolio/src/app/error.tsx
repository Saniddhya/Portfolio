"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center px-6">
        <h1 className="font-display text-4xl font-semibold mb-4">
          Something went wrong
        </h1>
        <p className="text-muted mb-8">
          An unexpected error occurred. Please try again.
        </p>
        <button
          type="button"
          onClick={reset}
          className="btn primary"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
