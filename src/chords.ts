export interface ChordShape {
  name: string;
  symbol: string;
  group: number;
  rootString: number; // 6, 5, or 4
  // Absolute fret positions for the example tone (root at fret 3)
  // null = string not played
  frets: [
    number | null, // E (6th string)
    number | null, // A (5th string)
    number | null, // D (4th string)
    number | null, // G (3rd string)
    number | null, // B (2nd string)
    number | null, // e (1st string)
  ];
}

// All shapes use fret 3 as the root in the examples
const EXAMPLE_ROOT_FRET = 3;

export const CHORD_SHAPES: ChordShape[] = [
  // Group 1: Root on 6th string (example: G)
  { name: "Major 7",      symbol: "Maj7",   group: 1, rootString: 6, frets: [3, null, 4, 4, 3, null] },
  { name: "Minor 7",      symbol: "m7",     group: 1, rootString: 6, frets: [3, null, 3, 3, 3, null] },
  { name: "Dominant 7",   symbol: "7",      group: 1, rootString: 6, frets: [3, null, 3, 4, 3, null] },
  { name: "Half-Dim",     symbol: "m7b5",   group: 1, rootString: 6, frets: [3, null, 3, 3, 2, null] },
  { name: "Full Dim",     symbol: "°7",     group: 1, rootString: 6, frets: [3, null, 2, 3, 2, null] },
  { name: "Major 6",      symbol: "6",      group: 1, rootString: 6, frets: [3, null, 2, 4, 5, null] },
  { name: "Minor 6",      symbol: "m6",     group: 1, rootString: 6, frets: [3, null, 2, 3, 5, null] },
  { name: "Dominant 9",   symbol: "9",      group: 1, rootString: 6, frets: [3, null, 3, 2, 3, null] },
  { name: "Sus 4",        symbol: "sus4",   group: 1, rootString: 6, frets: [3, null, 5, 5, 3, null] },

  // Group 2: Root on 5th string (example: C)
  { name: "Major 7",      symbol: "Maj7",   group: 2, rootString: 5, frets: [null, 3, 5, 4, 5, 3] },
  { name: "Minor 7",      symbol: "m7",     group: 2, rootString: 5, frets: [null, 3, 5, 3, 4, 3] },
  { name: "Dominant 7",   symbol: "7",      group: 2, rootString: 5, frets: [null, 3, 5, 3, 5, 3] },
  { name: "Half-Dim",     symbol: "m7b5",   group: 2, rootString: 5, frets: [null, 3, 4, 3, 4, null] },
  { name: "Full Dim",     symbol: "°7",     group: 2, rootString: 5, frets: [null, 3, 4, 2, 4, null] },
  { name: "Major 6",      symbol: "6",      group: 2, rootString: 5, frets: [null, 3, 5, 5, 5, 5] },
  { name: "Minor 6",      symbol: "m6",     group: 2, rootString: 5, frets: [null, 3, 5, 2, 4, null] },
  { name: "Dominant 9",   symbol: "9",      group: 2, rootString: 5, frets: [null, 3, 2, 3, 3, null] },
  { name: "Sus 4",        symbol: "sus4",   group: 2, rootString: 5, frets: [null, 3, 5, 5, 6, 3] },

  // Group 3: Root on 4th string (example: F)
  { name: "Major 7",      symbol: "Maj7",   group: 3, rootString: 4, frets: [null, null, 3, 5, 5, 5] },
  { name: "Minor 7",      symbol: "m7",     group: 3, rootString: 4, frets: [null, null, 3, 5, 4, 4] },
  { name: "Dominant 7",   symbol: "7",      group: 3, rootString: 4, frets: [null, null, 3, 5, 4, 5] },
  { name: "Half-Dim",     symbol: "m7b5",   group: 3, rootString: 4, frets: [null, null, 3, 4, 4, 4] },
  { name: "Full Dim",     symbol: "°7",     group: 3, rootString: 4, frets: [null, null, 3, 4, 3, 4] },
  { name: "Major 6",      symbol: "6",      group: 3, rootString: 4, frets: [null, null, 3, 5, 3, 5] },
  { name: "Minor 6",      symbol: "m6",     group: 3, rootString: 4, frets: [null, null, 3, 5, 3, 4] },
  { name: "Dominant 9",   symbol: "9",      group: 3, rootString: 4, frets: [null, null, 3, 2, 4, 3] },
  { name: "Sus 4",        symbol: "sus4",   group: 3, rootString: 4, frets: [null, null, 3, 5, 6, 6] },
];

export const NOTES = ["C", "C#", "D", "Eb", "E", "F", "F#", "G", "Ab", "A", "Bb", "B"] as const;
export type Note = typeof NOTES[number];

// Semitones from C for each note
const NOTE_INDEX: Record<Note, number> = {
  "C": 0, "C#": 1, "D": 2, "Eb": 3, "E": 4, "F": 5,
  "F#": 6, "G": 7, "Ab": 8, "A": 9, "Bb": 10, "B": 11,
};

// Open string notes
const OPEN_STRING_NOTE: Record<number, Note> = {
  6: "E",  // low E
  5: "A",
  4: "D",
};

function semitonesFromOpen(rootString: number, targetNote: Note): number {
  const openNote = OPEN_STRING_NOTE[rootString];
  const openIndex = NOTE_INDEX[openNote];
  const targetIndex = NOTE_INDEX[targetNote];
  return (targetIndex - openIndex + 12) % 12;
}

export interface DiatonicChord {
  degree: string;
  root: Note;
  symbol: string;
}

const MAJOR_SCALE_INTERVALS = [0, 2, 4, 5, 7, 9, 11];
const DIATONIC_SYMBOLS = ["Maj7", "m7", "m7", "Maj7", "7", "m7", "m7b5"];
const DEGREE_LABELS = ["I", "ii", "iii", "IV", "V", "vi", "vii"];

const FOURTHS_ORDER = [0, 3, 6, 2, 5, 1, 4];

export function getDiatonicChords(key: Note): DiatonicChord[] {
  const keyIndex = NOTE_INDEX[key];
  return FOURTHS_ORDER.map((i) => ({
    degree: DEGREE_LABELS[i],
    root: NOTES[(keyIndex + MAJOR_SCALE_INTERVALS[i]) % 12],
    symbol: DIATONIC_SYMBOLS[i],
  }));
}

export function findShape(symbol: string, group: number): ChordShape | undefined {
  return CHORD_SHAPES.find(s => s.symbol === symbol && s.group === group);
}

export function transposeChord(shape: ChordShape, targetNote: Note): { frets: (number | null)[]; position: number } {
  const exampleFret = EXAMPLE_ROOT_FRET;
  const targetFret = semitonesFromOpen(shape.rootString, targetNote);

  // Use fret 12+ if target would be 0 (open string)
  const effectiveTargetFret = targetFret === 0 ? 12 : targetFret;
  const offset = effectiveTargetFret - exampleFret;

  const transposedFrets = shape.frets.map(f => f !== null ? f + offset : null);

  const playedFrets = transposedFrets.filter((f): f is number => f !== null);
  const minFret = Math.min(...playedFrets);
  const position = Math.max(1, minFret);

  return { frets: transposedFrets, position };
}
