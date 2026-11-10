/* A transparent window: Task 5's scene turns to sunrise behind it. The still sits underneath until then. */
export function DawnWindow() {
  return (
    <section id="dawn-window" className="dawn-window on-dark" aria-hidden="true">
      <picture>
        <source media="(min-width: 900px)" srcSet="/stills/dawn-desktop.svg" />
        <img className="dawn-still" src="/stills/dawn-phone.svg" alt="" width="390" height="844" />
      </picture>
      <div className="wrap">
        <p className="dawn-caption mono">First light on the saddle</p>
      </div>
    </section>
  );
}
