import "@/app/trail.css";
import { stages } from "@/content/approach";

/* The drawing's frame: four columns, one waypoint at the head of each, climbing left to right. */
const W = 1000;
const H = 150;
const BASE = 148;
const WAYPOINTS = stages.map((s, i) => ({ name: s.name, x: 14 + i * 250, y: 118 - i * 30 }));

/** One smooth climb: level at each waypoint, an S-bend between them, then on up toward the light. */
const TRAIL = [
  `M0 ${WAYPOINTS[0].y} H${WAYPOINTS[0].x}`,
  ...WAYPOINTS.slice(1).map((p, i) => {
    const q = WAYPOINTS[i];
    return `C${q.x + 120} ${q.y} ${p.x - 120} ${p.y} ${p.x} ${p.y}`;
  }),
  `C${WAYPOINTS[3].x + 120} ${WAYPOINTS[3].y} ${W - 90} 10 ${W} 8`,
].join(" ");

/**
 * The four stages as a trail: a dotted Ember line climbing through four lantern waypoints (decorative SVG),
 * with each stage's name and text as an ordered list beside it. Horizontal on wide screens; on phones the
 * list stacks and the trail runs down its left edge.
 */
export function TrailStages() {
  return (
    <div className="trail">
      <svg className="trail-map" viewBox={`0 0 ${W} ${H}`} aria-hidden="true" focusable="false">
        <line className="trail-base" x1="0" y1={BASE} x2={W} y2={BASE} />
        {WAYPOINTS.map((p) => (
          <line key={p.name} className="trail-stake" x1={p.x} y1={p.y + 14} x2={p.x} y2={BASE - 4} />
        ))}
        <path className="trail-path" d={TRAIL} />
        {WAYPOINTS.map((p) => (
          <g key={p.name} className="trail-waypoint" data-stage={p.name} transform={`translate(${p.x} ${p.y})`}>
            <circle className="trail-ring" r="10" />
            <circle className="trail-core" r="4.5" />
          </g>
        ))}
      </svg>
      <ol className="trail-list">
        {stages.map((s, i) => (
          <li key={s.name}>
            <span className="trail-label">
              Stage {String(i + 1).padStart(2, "0")} / {String(stages.length).padStart(2, "0")}
            </span>
            <h3>{s.name}</h3>
            <p>{s.line}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
