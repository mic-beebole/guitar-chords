import { SVGuitarChord, ChordStyle } from "svguitar";
import { NOTES, findCompactVoicings, findShape, transposeChord } from "./chords";
import type { Note } from "./chords";
import "./style.css";

function renderCompact(key: Note) {
  const container = document.getElementById("chords")!;
  container.innerHTML = "";

  const voicings = findCompactVoicings(key);

  const grid = document.createElement("div");
  grid.className = "compact-grid";

  for (const { chord, group } of voicings) {
    const shape = findShape(chord.symbol, group)!;
    const { frets, position } = transposeChord(shape, chord.root);

    const wrapper = document.createElement("div");
    wrapper.className = "chord-wrapper";

    const degree = document.createElement("div");
    degree.className = "degree-label";
    degree.textContent = chord.degree;
    wrapper.appendChild(degree);

    const chartDiv = document.createElement("div");
    chartDiv.className = "chord-chart";
    wrapper.appendChild(chartDiv);

    const groupTag = document.createElement("div");
    groupTag.className = "group-tag";
    groupTag.textContent = `group ${group}`;
    wrapper.appendChild(groupTag);

    grid.appendChild(wrapper);

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

  container.appendChild(grid);
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
  select.addEventListener("change", () => renderCompact(select.value as Note));

  renderCompact("C");
}

init();
