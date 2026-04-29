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
    title: "All of Me",
    key: "C",
    bars: [
      [c("C","Maj7")], [c("C","Maj7")], [c("E","7")],   [c("E","7")],
      [c("A","7")],    [c("A","7")],    [c("D","m7")],   [c("D","m7")],
      [c("E","7")],    [c("E","7")],    [c("A","m7")],   [c("A","m7")],
      [c("D","7")],    [c("D","7")],    [c("D","m7")],   [c("G","7")],
      [c("C","Maj7")], [c("C","Maj7")], [c("E","7")],    [c("E","7")],
      [c("A","7")],    [c("A","7")],    [c("D","m7")],   [c("D","m7")],
      [c("F","Maj7")], [c("F","m6")],   [c("C","Maj7")], [c("A","7")],
      [c("D","m7")],   [c("G","7")],    [c("C","Maj7")], [c("D","m7"), c("G","7")],
    ],
  },
  {
    title: "Autumn Leaves",
    key: "Bb",
    bars: [
      // A
      [c("C","m7")],     [c("F","7")],    [c("Bb","Maj7")], [c("Eb","Maj7")],
      [c("A","m7b5")],   [c("D","7")],    [c("G","m7")],    [c("G","m7")],
      // A
      [c("C","m7")],     [c("F","7")],    [c("Bb","Maj7")], [c("Eb","Maj7")],
      [c("A","m7b5")],   [c("D","7")],    [c("G","m7")],    [c("G","m7")],
      // B
      [c("A","m7b5")],   [c("D","7")],    [c("G","m7")],    [c("G","m7")],
      [c("C","m7")],     [c("F","7")],    [c("Bb","Maj7")], [c("Eb","Maj7")],
      // A'
      [c("A","m7b5")],   [c("D","7")],    [c("G","m7"), c("Eb","7")], [c("A","m7b5"), c("D","7")],
      [c("G","m7")],     [c("G","m7")],   [c("G","m7")],    [c("G","m7")],
    ],
  },
  {
    title: "Black Orpheus",
    key: "A",
    bars: [
      // A
      [c("A","m7")],                     [c("B","m7b5"), c("E","7")],
      [c("A","m7")],                     [c("B","m7b5"), c("E","7")],
      [c("A","m7")],                     [c("D","m7"),   c("G","7")],
      [c("C","Maj7")],                   [c("F","Maj7")],
      // A
      [c("B","m7b5")],                   [c("E","7")],
      [c("A","m7")],                     [c("A","m7")],
      [c("D","m7")],                     [c("G","7")],
      [c("C","Maj7")],                   [c("F","Maj7")],
      // B
      [c("B","m7b5")],                   [c("E","7")],
      [c("A","m7"), c("A","7")],         [c("D","m7")],
      [c("G","7")],                      [c("C","Maj7")],
      [c("F","Maj7")],                   [c("B","m7b5"), c("E","7")],
      // A'
      [c("A","m7")],                     [c("B","m7b5"), c("E","7")],
      [c("A","m7")],                     [c("B","m7b5"), c("E","7")],
      [c("A","m7")],                     [c("E","7")],
      [c("A","m7")],                     [c("B","m7b5"), c("E","7")],
    ],
  },
  {
    title: "Fly Me to the Moon",
    key: "C",
    bars: [
      [c("A","m7")],   [c("D","m7")],    [c("G","7")],     [c("C","Maj7")],
      [c("F","Maj7")],  [c("B","m7b5")], [c("E","7")],     [c("A","m7"), c("A","7")],
      [c("D","m7")],   [c("G","7")],     [c("C","Maj7")],  [c("A","7")],
      [c("D","m7")],   [c("G","7")],     [c("C","Maj7")],  [c("B","m7b5"), c("E","7")],
      // repeat
      [c("A","m7")],   [c("D","m7")],    [c("G","7")],     [c("C","Maj7")],
      [c("F","Maj7")],  [c("B","m7b5")], [c("E","7")],     [c("A","m7"), c("A","7")],
      [c("D","m7")],   [c("G","7")],     [c("E","m7"), c("A","7")], [c("D","m7"), c("G","7")],
      [c("C","Maj7")], [c("C","Maj7")],  [c("C","Maj7")],  [c("C","Maj7")],
    ],
  },
];
