import { useEffect, useState } from "react";

/** Mark the section actually being read; three measurements, at most once per frame. */
export function useHomeSection(ids: readonly string[]) {
  const [active, setActive] = useState("");
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const offset = (document.querySelector(".home-header")?.getBoundingClientRect().height ?? 80) + 60;
      const current = ids.filter(id => {
        const element = document.getElementById(id);
        return element && element.getBoundingClientRect().top <= offset;
      }).at(-1) ?? "";
      setActive(current);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [ids]);
  return active;
}
