import type { Metadata } from "next";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Footer } from "@/components/sections/Footer";
import { socials } from "@/data/socials";

export const metadata: Metadata = {
  title: "Contact — Sanidhya Rathore",
  description:
    "Get in touch with Sanidhya Rathore — full-stack developer based in Pune, India.",
};

export default function ContactPage() {
  return (
    <main className="pt-32">
      <section className="section" aria-label="Contact">
        <div className="container">
          <div className="mb-12">
            <Eyebrow>Contact</Eyebrow>
            <h1 className="font-display text-4xl md:text-5xl xl:text-6xl font-semibold tracking-[-0.03em] mt-4">
              Let's build something
              <br />
              <span className="text-accent">worth shipping.</span>
            </h1>
          </div>

          <p className="text-muted text-lg max-w-xl mb-12 leading-relaxed">
            Have a project in mind, a role to fill, or just want to talk
            about the stack? My inbox is always open.
          </p>

          <div className="flex flex-col gap-4">
            <a
              href="mailto:rathorekuah@gmail.com"
              className="contact-link"
            >
              rathorekuah@gmail.com
            </a>

            <div className="flex flex-wrap gap-6 mt-8">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    social.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="font-mono text-sm text-muted hover:text-accent transition-colors"
                >
                  {social.label} ↗
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}