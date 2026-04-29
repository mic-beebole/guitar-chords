import { pickCompactGroups } from "./chords";
import type { Note } from "./chords";
import { renderChordDiagram } from "./render";
import { SONGS } from "./songs";
import type { Song, SongChord } from "./songs";
import "./style.css";

function renderSong(song: Song) {
  const sheet = document.getElementById("lead-sheet")!;
  sheet.innerHTML = "";

  const title = document.createElement("h2");
  title.textContent = `${song.title} (key of ${song.key})`;
  sheet.appendChild(title);

  // Flatten all chords to pick compact voicings across the whole song
  const flatChords: SongChord[] = [];
  const barGroupIndices: number[][] = [];
  for (const bar of song.bars) {
    const indices: number[] = [];
    for (const chord of bar) {
      indices.push(flatChords.length);
      flatChords.push(chord);
    }
    barGroupIndices.push(indices);
  }

  const groups = pickCompactGroups(flatChords);

  // Render 4 bars per row
  for (let rowStart = 0; rowStart < song.bars.length; rowStart += 4) {
    const row = document.createElement("div");
    row.className = "bar-row";

    const rowEnd = Math.min(rowStart + 4, song.bars.length);
    for (let b = rowStart; b < rowEnd; b++) {
      const bar = song.bars[b];
      const barDiv = document.createElement("div");
      barDiv.className = "bar";

      for (let ci = 0; ci < bar.length; ci++) {
        const chord = bar[ci];
        const groupIdx = barGroupIndices[b][ci];
        const group = groups[groupIdx];

        const chordDiv = document.createElement("div");
        chordDiv.className = "bar-chord";

        const chartDiv = document.createElement("div");
        chartDiv.className = "chord-chart";
        chordDiv.appendChild(chartDiv);
        barDiv.appendChild(chordDiv);

        renderChordDiagram(chartDiv, chord.root as Note, chord.symbol, group, {
          titleFontSize: 32,
          frets: 3,
        });
      }

      row.appendChild(barDiv);
    }

    sheet.appendChild(row);
  }
}

function init() {
  const list = document.getElementById("song-list")!;

  SONGS.forEach((song, i) => {
    const btn = document.createElement("button");
    btn.textContent = song.title;
    btn.addEventListener("click", () => {
      list.querySelectorAll("button").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      renderSong(song);
    });
    list.appendChild(btn);

    if (i === 0) {
      btn.classList.add("active");
      renderSong(song);
    }
  });
}

init();
