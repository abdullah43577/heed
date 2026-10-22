// Mirrors resolveCitations in ../heed-server/src/lib/ask/citations.ts, which rewrites the saved answer;
// this only shapes text that is still streaming.
const NATIVE_MARKER = /【(\d{1,2})(?:†[^】]*)?】/g;

export interface AnswerSegment {
  text: string;
  isMarker: boolean;
}

export const splitCitationMarkers = function (text: string): AnswerSegment[] {
  return text
    .replace(NATIVE_MARKER, "[$1]")
    .split(/(\[\d{1,2}\])/)
    .map((part, index) => ({ text: index % 2 === 1 ? part.slice(1, -1) : part, isMarker: index % 2 === 1 }))
    .filter((segment) => segment.text.length > 0);
};
