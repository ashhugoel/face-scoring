import type { GPTGeometryScores } from "../../types/scores.js";

export function jawlineScore(g :GPTGeometryScores) {
    return Math.round(
      0.45 * g.jaw +
      0.25 * g.chin +
      0.15 * g.tilt +
      0.15 * g.overall
    );
  }
  