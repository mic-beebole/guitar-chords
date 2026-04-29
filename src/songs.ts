import type { Note } from "./chords";

export interface SongChord {
  root: Note;
  symbol: string;
}

export type Bar = [SongChord] | [SongChord, SongChord];

export interface Song {
  title: string;
  key: Note;
  bars: Bar[];
}

function c(root: Note, symbol: string): SongChord {
  return { root, symbol };
}

export const SONGS: Song[] = [
  {
    // Transcribed from Real Book lead sheet — Simons & Marks
    title: "All of Me",
    key: "C",
    bars: [
      // A
      [c("C","Maj7")],  [c("C","Maj7")],  [c("E","7")],     [c("E","7")],
      [c("A","7")],     [c("A","7")],     [c("D","m7")],    [c("D","m7")],
      [c("E","7")],     [c("E","7")],     [c("A","m7")],    [c("A","m7")],
      [c("D","7")],     [c("D","7")],     [c("D","m7")],    [c("G","7")],
      // B
      [c("C","Maj7")],  [c("C","Maj7")],  [c("E","7")],     [c("E","7")],
      [c("A","7")],     [c("A","7")],     [c("D","m7")],    [c("D","m7")],
      [c("F","Maj7")],  [c("F","m6")],    [c("C","Maj7"), c("E","m7")], [c("A","7")],
      [c("D","m7")],    [c("G","7")],     [c("C","6")],     [c("D","m7"), c("G","7")],
    ],
  },
  {
    // Transcribed from Real Book lead sheet — Louis Bonfa
    title: "Black Orpheus",
    key: "A",
    bars: [
      // A
      [c("A","m7")],                      [c("B","m7b5"), c("E","7")],
      [c("A","m7")],                      [c("B","m7b5"), c("E","7")],
      [c("A","m7")],                      [c("D","m7"),   c("G","7")],
      [c("C","Maj7")],                    [c("C#","°7"),  c("A","7")],
      // A'
      [c("D","m7")],                      [c("G","7")],
      [c("C","6")],                       [c("F","Maj7")],
      [c("B","m7b5")],                    [c("E","7")],
      [c("A","m7")],                      [c("B","m7b5"), c("E","7")],
      // B
      [c("A","m7")],                      [c("B","m7b5"), c("E","7")],
      [c("A","m7")],                      [c("B","m7b5"), c("E","7")],
      [c("E","m7b5")],                    [c("A","7")],
      [c("D","m7")],                      [c("D","m7")],
      // C
      [c("D","m7")],                      [c("D","m7"), c("B","m7b5")],
      [c("E","7")],                       [c("A","m7"), c("F","Maj7")],
      [c("B","m7b5")],                    [c("E","7")],
      [c("A","m7")],                      [c("B","m7b5"), c("E","7")],
    ],
  },
];
