import type { Landmark } from "../types/engine.js";


export function normalizeValue(n: number): string {
  const v = n.toFixed(3);

  if (v.startsWith("0.")) {
    return v.slice(1);
  }
  if (v.startsWith("-0.")) {
    return "-" + v.slice(2);
  }

  return v;
}


export function normalize(landmark: Landmark): string {
  console.log("Total number of landmarks passed" ,landmark.length)
  const lines: string[] = [];
  for (const xyz of landmark) {
    const x = normalizeValue(xyz.x);
    const y = normalizeValue(xyz.y);
    const z = normalizeValue(xyz.z);

    lines.push(`${x};${y}`);
  }

  return lines.join(";");
}

