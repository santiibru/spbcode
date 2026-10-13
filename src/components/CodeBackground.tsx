import { snippets } from "./snippets";

// Orden de los fragmentos por columna. Cada columna repite su bloque dos veces
// para que el bucle (translateY -50%) no tenga saltos.
const columns = [
  [0, 1, 2, 3],
  [2, 3, 0, 1],
  [1, 0, 3, 2],
];

const tracks = columns.map((order) => {
  const block = order.map((i) => snippets[i]).join("\n");
  return block + "\n" + block;
});

export function CodeBackground() {
  return (
    <div className="code-bg" aria-hidden="true">
      {tracks.map((html, i) => (
        <div className="col" key={i}>
          <div className="track" dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      ))}
    </div>
  );
}
