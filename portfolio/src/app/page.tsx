import Hero from "@/components/sections/Hero";
import Introduction from "@/components/sections/Introduction";
import Journey from "@/components/sections/Journey";
import Capabilities from "@/components/sections/Capabilities";
import Projects from "@/components/sections/Projects";
import Stack from "@/components/sections/Stack";
import Principles from "@/components/sections/Principles";
import Activity from "@/components/sections/Activity";
import Direction from "@/components/sections/Direction";
import Now from "@/components/sections/Now";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

/**
 * Home.
 *
 * One continuous narrative rather than a stack of generic blocks:
 * open → identity → system → builder → projects → technology → thinking →
 * now → contact.
 *
 * Everything except the two interactive islands (the WebGL core and the stack
 * constellation) renders as a server component, so the page is complete in the
 * initial HTML.
 */
export default function HomePage() {
  return (
    <>
      <main id="main">
        <Hero />
        <Introduction />
        <Journey />
        <Capabilities />
        <Projects />
        <Stack />
        <Principles />
        <Activity />
        <Direction />
        <Now />
        <Contact />
      </main>
      <Footer />
    </>
  );
}