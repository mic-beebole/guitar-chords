import { SVGuitarChord, ChordStyle } from "svguitar";
import { NOTES, getDiatonicChords, findShape, transposeChord } from "./chords";
import type { Note } from "./chords";
import "./style.css";

const GROUP_LABELS: Record<number, string> = {
  1: "Root on 6th string",
  2: "Root on 5th string",
  3: "Root on 4th string",
};

function renderDiatonic(key: Note) {
  const container = document.getElementById("chords")!;
  container.innerHTML = "";

  const chords = getDiatonicChords(key);

  for (const group of [1, 2, 3]) {
    const section = document.createElement("div");
    section.className = "group-section";

    const heading = document.createElement("h2");
    heading.textContent = `Group ${group}: ${GROUP_LABELS[group]}`;
    section.appendChild(heading);

    const grid = document.createElement("div");
    grid.className = "chord-grid";

    for (const chord of chords) {
      const shape = findShape(chord.symbol, group);
      if (!shape) continue;

      const wrapper = document.createElement("div");
      wrapper.className = "chord-wrapper";

      const chartDiv = document.createElement("div");
      chartDiv.className = "chord-chart";
      wrapper.appendChild(chartDiv);
      grid.appendChild(wrapper);

      const { frets, position } = transposeChord(shape, chord.root);

      const fingers: [number, number | "x"][] = [];
      for (let i = 0; i < 6; i++) {
        const svgString = 6 - i;
        const fret = frets[i];
        if (fret === null) {
          fingers.push([svgString, "x"]);
        } else {
          const relativeFret = fret - position + 1;
          fingers.push([svgString, relativeFret]);
        }
      }

      new SVGuitarChord(chartDiv)
        .chord({
          fingers,
          barres: [],
          position,
        })
        .configure({
          title: `${chord.root}${chord.symbol}`,
          strings: 6,
          frets: 4,
          style: ChordStyle.normal,
          color: "#1a1a1a",
          titleColor: "#1a1a1a",
          stringColor: "#444",
          fretColor: "#444",
          nutWidth: 10,
          fingerColor: "#1a1a1a",
          titleFontSize: 48,
          titleBottomMargin: 20,
          fixedDiagramPosition: true,
          fingerSize: 0.65,
          sidePadding: 0.2,
          fretSize: 1.5,
          strokeWidth: 2,
        })
        .draw();
    }

    section.appendChild(grid);
    container.appendChild(section);
  }
}

function init() {
  const select = document.getElementById("tone-select") as HTMLSelectElement;

  for (const note of NOTES) {
    const option = document.createElement("option");
    option.value = note;
    option.textContent = note;
    select.appendChild(option);
  }

  select.value = "C";
  select.addEventListener("change", () => renderDiatonic(select.value as Note));

  renderDiatonic("C");
}

init();
