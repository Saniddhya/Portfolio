import Flow from "@/components/ui/Flow";
import { architectureLayers } from "@/data/journey";
import { profile } from "@/data/profile";

/** Editorial introduction: the thesis, then the layered system it implies. */
export default function Introduction() {
  return (
    <section id="about" className="section" aria-labelledby="intro-heading">
      <div className="container">
        <div className="section-head">
          <h2 id="intro-heading" className="display display-lg">
            I don&rsquo;t just
            <br />
            build interfaces.
            <br />
            <span className="text-accent">I build systems.</span>
          </h2>

          <div className="reveal space-y-5">
            <p className="lede">{profile.intro}</p>
            <p className="body-text max-w-[54ch]">
              Working across the whole stack means the interface and the data model
              stay in the same conversation. It removes the handoff where design
              decisions quietly become engineering problems.
            </p>
          </div>
        </div>

        {/* Layered architecture — each layer illuminates on interaction */}
        <div className="reveal grid gap-10 border-t border-line pt-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <div>
            <p className="eyebrow">System Architecture</p>
            <h3 className="display display-md mt-5">
              From the user
              <br />
              down to the metal.
            </h3>
            <p className="body-text mt-5 max-w-[42ch]">
              Every product is the same six layers. I work across all of them,
              because the interesting problems live in the seams between them.
            </p>
          </div>

          <Flow
            label="System architecture, from user to infrastructure"
            steps={architectureLayers.map((layer) => ({
              label: layer.label,
              detail: layer.detail,
            }))}
          />
        </div>
      </div>
    </section>
  );
}