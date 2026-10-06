import { status } from "@/data/journey";
import { experience } from "@/data/journey";
import { profile } from "@/data/profile";

/**
 * Experience + current status + about, combined into one closing block so the
 * page resolves rather than fragmenting into separate small sections.
 */
export default function Now() {
  return (
    <section className="section" aria-labelledby="now-heading">
      <div className="container">
        <h2 id="now-heading" className="sr-only">
          Experience and current status
        </h2>

        {/* ---- Experience ---- */}
        <div className="reveal border-t border-line pt-12">
          <p className="eyebrow">Experience</p>

          {experience.map((role) => (
            <article key={role.period + role.org} className="mt-8 grid gap-6 lg:grid-cols-[160px_minmax(0,1fr)] lg:gap-10">
              <div>
                <p className="mono text-[11px] text-accent/70">{role.period}</p>
              </div>

              <div>
                <h3 className="display display-sm">{role.role}</h3>
                <p className="mono mt-2 text-[11px] text-muted">
                  {role.org} · {role.context}
                </p>

                <p className="body-text mt-5 max-w-[62ch]">{role.body}</p>

                <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                  {role.responsibilities.map((item) => (
                    <li key={item} className="flex gap-3 text-[14px] leading-relaxed text-muted">
                      <span
                        className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent/70"
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>

                <ul className="mt-6 flex flex-wrap gap-2">
                  {role.technologies.map((tech) => (
                    <li key={tech} className="mono border border-line px-2.5 py-1 text-[10px] text-muted-2">
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        {/* ---- Status + About ---- */}
        <div className="mt-24 grid gap-12 border-t border-line pt-12 lg:grid-cols-2 lg:gap-16">
          <div className="reveal">
            <p className="eyebrow">Currently</p>

            <dl className="mt-8 space-y-8">
              <div>
                <dt className="mono text-[10px] text-accent/70">Building</dt>
                <dd className="mt-3 flex flex-wrap gap-2">
                  {status.building.map((item) => (
                    <span key={item} className="text-[15px] text-fg">
                      {item}
                    </span>
                  ))}
                </dd>
              </div>
              <div>
                <dt className="mono text-[10px] text-accent/70">Learning</dt>
                <dd className="mt-3 flex flex-wrap gap-2">
                  {status.learning.map((item) => (
                    <span key={item} className="border border-line px-3 py-1.5 text-[13px] text-muted">
                      {item}
                    </span>
                  ))}
                </dd>
              </div>
              <div>
                <dt className="mono text-[10px] text-accent/70">Open to</dt>
                <dd className="mt-3 flex flex-wrap gap-2">
                  {status.openTo.map((item) => (
                    <span key={item} className="border border-line px-3 py-1.5 text-[13px] text-muted">
                      {item}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>
          </div>

          <div className="reveal">
            <p className="eyebrow">About</p>

            <h3 className="display display-md mt-8">{profile.name}</h3>
            <p className="mono mt-3 text-[11px] text-muted">{profile.role}</p>
            <p className="body-text mt-5 text-muted">{profile.location}</p>

            <p className="lede mt-7 max-w-[36ch]">{profile.bio}</p>
          </div>
        </div>
      </div>
    </section>
  );
}