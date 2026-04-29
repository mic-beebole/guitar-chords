import { SVGuitarChord, ChordStyle } from "svguitar";
import { findShape, transposeChord } from "./chords";
import type { Note } from "./chords";

export function renderChordDiagram(
  container: HTMLElement,
  root: Note,
  symbol: string,
  group: number,
  opts: { titleFontSize?: number; frets?: number } = {},
) {
  const shape = findShape(symbol, group);
  if (!shape) return;
  const { frets, position } = transposeChord(shape, root);

  const fingers: [number, number | "x"][] = [];
  for (let i = 0; i < 6; i++) {
    const svgString = 6 - i;
    const fret = frets[i];
    if (fret === null) {
      fingers.push([svgString, "x"]);
    } else {
      fingers.push([svgString, fret - position + 1]);
    }
  }

  new SVGuitarChord(container)
    .chord({ fingers, barres: [], position })
    .configure({
      title: `${root}${symbol}`,
      strings: 6,
      frets: opts.frets ?? 4,
      style: ChordStyle.normal,
      color: "#1a1a1a",
      titleColor: "#1a1a1a",
      stringColor: "#444",
      fretColor: "#444",
      nutWidth: 10,
      fingerColor: "#1a1a1a",
      titleFontSize: opts.titleFontSize ?? 48,
      titleBottomMargin: 20,
      fixedDiagramPosition: true,
      fingerSize: 0.65,
      sidePadding: 0.2,
      fretSize: 1.5,
      strokeWidth: 2,
    })
    .draw();
}
