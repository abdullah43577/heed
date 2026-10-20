// Mirrors findPlaceholders in ../heed-server/src/lib/drafting/placeholders.ts; the server re-checks before sending.
const PLACEHOLDER = /\[[^[\]\n]{1,80}\]/g;

export const findPlaceholders = function (body: string) {
  return [...new Set(body.match(PLACEHOLDER) ?? [])];
};

export interface BodySegment {
  text: string;
  isPlaceholder: boolean;
}

export const splitPlaceholders = function (body: string): BodySegment[] {
  return body
    .split(/(\[[^[\]\n]{1,80}\])/)
    .map((text, index) => ({ text, isPlaceholder: index % 2 === 1 }))
    .filter((segment) => segment.text.length > 0);
};
