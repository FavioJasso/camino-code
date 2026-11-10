import { transparentEnergy as te } from "@/content/proof";

export function Figures() {
  return (
    <ul className="in-figs">
      {te.figures.map((f) => (
        <li className="in-fig" key={f.value}>
          <b>{f.value}</b>
          <span>{f.label}</span>
        </li>
      ))}
    </ul>
  );
}
