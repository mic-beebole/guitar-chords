import { NOTES, findCompactVoicings, findShape, transposeChord } from "./chords";
import type { Note, VoicedChord } from "./chords";
import "./style.css";

const COLORS = [
  "#e54d2e", // red
  "#e5772e", // orange
  "#d5a019", // yellow
  "#30a46c", // green
  "#0091b2", // teal
  "#3e63dd", // blue
  "#8e4ec6", // purple
];

const STRING_LABELS = ["E", "A", "D", "G", "B", "e"];

interface PlottedNote {
  stringIdx: number; // 0=E .. 5=e
  fret: number;
  color: string;
  label: string;
}

function buildNotes(voicings: VoicedChord[]): PlottedNote[] {
  const notes: PlottedNote[] = [];
  voicings.forEach(({ chord, group }, vi) => {
    const shape = findShape(chord.symbol, group)!;
    const { frets } = transposeChord(shape, chord.root);
    const label = `${chord.root}${chord.symbol}`;
    for (let s = 0; s < 6; s++) {
      const fret = frets[s];
      if (fret !== null) {
        notes.push({ stringIdx: s, fret, color: COLORS[vi], label });
      }
    }
  });
  return notes;
}

function renderFretboard(key: Note) {
  const container = document.getElementById("chords")!;
  container.innerHTML = "";

  const voicings = findCompactVoicings(key);
  const notes = buildNotes(voicings);

  const allFrets = notes.map((n) => n.fret);
  const minFret = Math.max(1, Math.min(...allFrets) - 1);
  const maxFret = Math.max(...allFrets) + 1;
  const fretCount = maxFret - minFret + 1;

  const marginLeft = 30;
  const marginRight = 20;
  const marginTop = 20;
  const marginBottom = 60;
  const fretSpacing = 70;
  const stringSpacing = 30;
  const dotRadius = 10;

  const width = marginLeft + fretCount * fretSpacing + marginRight;
  const height = marginTop + 5 * stringSpacing + marginBottom;

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
  svg.setAttribute("width", "100%");
  svg.style.maxWidth = `${width}px`;

  // Fret lines
  for (let f = 0; f <= fretCount; f++) {
    const x = marginLeft + f * fretSpacing;
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", String(x));
    line.setAttribute("y1", String(marginTop));
    line.setAttribute("x2", String(x));
    line.setAttribute("y2", String(marginTop + 5 * stringSpacing));
    line.setAttribute("stroke", f === 0 ? "#1a1a1a" : "#ccc");
    line.setAttribute("stroke-width", f === 0 ? "4" : "1");
    svg.appendChild(line);

    // Fret numbers
    if (f > 0) {
      const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
      label.setAttribute("x", String(x - fretSpacing / 2));
      label.setAttribute("y", String(marginTop + 5 * stringSpacing + 20));
      label.setAttribute("text-anchor", "middle");
      label.setAttribute("font-size", "12");
      label.setAttribute("fill", "#999");
      label.textContent = String(minFret + f - 1);
      svg.appendChild(label);
    }
  }

  // String lines
  for (let s = 0; s < 6; s++) {
    const y = marginTop + s * stringSpacing;
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", String(marginLeft));
    line.setAttribute("y1", String(y));
    line.setAttribute("x2", String(marginLeft + fretCount * fretSpacing));
    line.setAttribute("y2", String(y));
    line.setAttribute("stroke", "#999");
    line.setAttribute("stroke-width", "1");
    svg.appendChild(line);

    // String labels
    const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
    label.setAttribute("x", String(marginLeft - 14));
    label.setAttribute("y", String(y + 4));
    label.setAttribute("text-anchor", "middle");
    label.setAttribute("font-size", "12");
    label.setAttribute("fill", "#666");
    label.textContent = STRING_LABELS[s];
    svg.appendChild(label);
  }

  // Dots
  for (const note of notes) {
    const fretOffset = note.fret - minFret + 1;
    const cx = marginLeft + (fretOffset - 0.5) * fretSpacing;
    const cy = marginTop + note.stringIdx * stringSpacing;

    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", String(cx));
    circle.setAttribute("cy", String(cy));
    circle.setAttribute("r", String(dotRadius));
    circle.setAttribute("fill", note.color);
    svg.appendChild(circle);
  }

  container.appendChild(svg);

  // Legend
  const legend = document.createElement("div");
  legend.className = "compact-legend";
  voicings.forEach(({ chord, group }, i) => {
    const item = document.createElement("div");
    item.className = "legend-item";

    const swatch = document.createElement("span");
    swatch.className = "legend-swatch";
    swatch.style.background = COLORS[i];
    item.appendChild(swatch);

    const text = document.createElement("span");
    text.innerHTML = `<strong>${chord.root}${chord.symbol}</strong> <small>(${chord.degree} · group ${group})</small>`;
    item.appendChild(text);

    legend.appendChild(item);
  });
  container.appendChild(legend);
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
  select.addEventListener("change", () => renderFretboard(select.value as Note));

  renderFretboard("C");
}

init();
