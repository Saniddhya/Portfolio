import Link from "next/link";
import Footer from "@/components/sections/Footer";

export default function NotFound() {
  return (
    <>
      <main id="main" className="flex min-h-[80svh] items-center pt-32">
        <div className="container">
          <p className="mono text-[11px] text-accent/70">404 — Not found</p>

          <h1 className="display display-lg mt-7">This page doesn&rsquo;t exist.</h1>

          <p className="lede mt-6 max-w-[44ch]">
            The link may be out of date, or the page may have moved.
          </p>

          <div className="mt-10">
            <Link href="/" className="btn btn-primary">
              Back to home
              <span className="btn-arrow" aria-hidden="true">
                →
              </span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}