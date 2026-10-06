import { profile, socials } from "@/data/profile";

/**
 * Contact.
 *
 * Intentionally simple: three links and one email. A contact form that sends
 * nowhere is worse than no form, so there isn't one.
 */
export default function Contact() {
  return (
    <section id="contact" className="section" aria-labelledby="contact-heading">
      <div className="container">
        <div className="reveal">
          <p className="eyebrow">Contact</p>

          <h2 id="contact-heading" className="display display-lg mt-7 max-w-[16ch]">
            Have a problem
            <br />
            worth building?
          </h2>

          <p className="lede mt-7 max-w-[46ch]">
            The most useful thing you can send is a description of the problem you
            are actually stuck on.
          </p>

          <div className="mt-11 flex flex-wrap gap-3">
            <a href={`mailto:${profile.email}`} className="btn btn-primary">
              Email me
              <span className="btn-arrow" aria-hidden="true">
                →
              </span>
            </a>

            {socials
              .filter((s) => s.label !== "Email")
              .map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="btn"
                >
                  {social.label}
                  <span className="btn-arrow" aria-hidden="true">
                    ↗
                  </span>
                  {social.href.startsWith("http") && (
                    <span className="sr-only">(opens in a new tab)</span>
                  )}
                </a>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}