import Link from "next/link";
import Flow from "@/components/ui/Flow";
import { direction } from "@/data/journey";

/**
 * What I'm building toward.
 *
 * Framed explicitly as exploration, not as a company with traction. The status
 * badge says EXPLORING and the pipeline is labelled a hypothesis.
 */
export default function Direction() {
  return (
    <section id="now" className="section" aria-labelledby="direction-heading">
      <div className="container">
        <div className="section-head">
          <h2 id="direction-heading" className="display display-lg">
            What I&rsquo;m
            <br />
            building toward.
          </h2>
          <p className="lede max-w-[50ch]">{direction.statement}</p>
        </div>

        <div className="grid gap-10 border-t border-line pt-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:gap-16">
          <div className="reveal">
            <p className="mono inline-flex items-center gap-2 border border-line px-3 py-1.5 text-[10px] text-accent/80">
              <span className="h-1 w-1 rounded-full bg-accent" aria-hidden="true" />
              {direction.status}
            </p>

            <h3 className="display display-md mt-7">{direction.headline}</h3>

            <p className="body-text mt-6 max-w-[52ch]">
              This is a direction, not a product with customers. The point of the
              pipeline is to make the intended shape of the system explicit — where
              automation ends, and where a person still decides.
            </p>

            <div className="mt-9">
              <Link href="/projects/aptino" className="btn" data-cursor="project">
                See the closest thing I&rsquo;ve built
                <span className="btn-arrow" aria-hidden="true">
                  →
                </span>
              </Link>
            </div>
          </div>

          <div className="reveal">
            <div className="panel">
              <p className="eyebrow">Intended Pipeline</p>
              <div className="mt-6">
                <Flow
                  label="Intended pipeline for financial decision systems"
                  detail={false}
                  steps={direction.pipeline.map((label) => ({ label }))}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}