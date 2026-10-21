import { HeroImage, Intro, LiveEntry } from "./HeroParts";
import type { HeroFixture } from "./fixtures";
export function OperationalHero({ fixture }: { fixture: HeroFixture }) {
  return (
    <section className="lab-hero lab-operational" aria-label="Abertura Operacional">
      <div className="lab-operational-grid">
        <Intro fixture={fixture} />
        <HeroImage src={fixture.image} />
      </div>
      <LiveEntry />
    </section>
  );
}
