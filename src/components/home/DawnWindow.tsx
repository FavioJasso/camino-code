/* A transparent window: the fixed scene turns to sunrise behind it. The still sits underneath until then.
   The caption carries the scene clock's hour, like the stamps in the section heads. */
export function DawnWindow() {
  return (
    <section id="dawn-window" className="dawn-window on-dark" aria-hidden="true">
      <picture>
        <source media="(min-width: 900px)" srcSet="/stills/dawn-desktop.svg" />
        <img className="dawn-still" src="/stills/dawn-phone.svg" alt="" width="390" height="540" />
      </picture>
      <div className="wrap">
        <p className="dawn-caption mono">06:24 · First light on the saddle</p>
      </div>
    </section>
  );
}
