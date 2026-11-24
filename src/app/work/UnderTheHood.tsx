import "./work.css";

type Figure = { readonly value: string; readonly label: string };

/**
 * Developer measurements as one small line at body size, under a short label. They say how a project
 * was built, not what it did for the client, so they never go in the large <Figures /> block.
 */
export function UnderTheHood({ label, figures }: { label: string; figures: readonly Figure[] }) {
  return (
    <div className="in-hood">
      <p className="in-mono">{label}</p>
      <ul>
        {figures.map((f) => (
          <li key={f.value}>
            <b>{f.value}</b> {f.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
