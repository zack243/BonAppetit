export function initScrollReveal(root: HTMLElement): () => void {
  const els = root.querySelectorAll<HTMLElement>(".sr, .sr-left, .sr-right, .sr-scale");
  if (!els.length) return () => {};

  els.forEach((el) => el.classList.add("sr-init"));

  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("sr-visible");
          obs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  els.forEach((el) => obs.observe(el));
  return () => obs.disconnect();
}
