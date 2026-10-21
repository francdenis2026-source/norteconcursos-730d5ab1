import { HeroImage, Intro, LiveEntry } from "./HeroParts";
import type { HeroFixture } from "./fixtures";
export function EditorialHero({ fixture }: { fixture: HeroFixture }) {
  return (
    <section className="lab-hero lab-editorial" aria-label="Abertura Editorial">
      <HeroImage src={fixture.image} />
      <div className="lab-editorial-copy">
        <Intro fixture={fixture} />
        <div className="lab-editorial-entry">
          <span className="lab-eyebrow">Seu primeiro passo</span>
          <LiveEntry />
        </div>
      </div>
    </section>
  );
}
