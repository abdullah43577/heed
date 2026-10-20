import { useSegments } from "expo-router";

// For a screen re-exported into several tab stacks: the same-named sibling in whichever stack it is in.
export const useSiblingRoute = function () {
  const segments = useSegments();
  return (name: string) => `/${[...segments.slice(0, -1), name].join("/")}` as any;
};
