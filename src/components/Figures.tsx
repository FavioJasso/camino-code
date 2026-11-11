import { transparentEnergy } from "@/content/proof";

type Figure = { readonly value: string; readonly label: string };

export function Figures({ figures = transparentEnergy.figures }: { figures?: readonly Figure[] }) {
  return (
    <ul className="in-figs" data-count={figures.length}>
      {figures.map((f) => (
        <li className="in-fig" key={f.value}>
          <b>{f.value}</b>
          <span>{f.label}</span>
        </li>
      ))}
    </ul>
  );
}
