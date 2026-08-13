import { marqueeSkills } from "@/data/skills";

const buildItems = (suffix: string) =>
  marqueeSkills.map((skill, i) => (
    <div key={`${skill}-${i}-${suffix}`} className="marquee-item">
      <span>{skill}</span>
      <span className="marquee-item-divider" aria-hidden="true">
        ✦
      </span>
    </div>
  ));

export function Marquee() {
  return (
    <div className="marquee" aria-label="Technologies marquee">
      <div className="marquee-track">
        <div className="marquee-group">{buildItems("a")}</div>
        <div className="marquee-group" aria-hidden="true">
          {buildItems("b")}
        </div>
      </div>
    </div>
  );
}