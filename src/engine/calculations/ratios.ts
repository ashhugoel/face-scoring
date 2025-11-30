import type { GPTGeometryScores } from "../../types/scores.js";

export function goldenRatioScore(g : GPTGeometryScores) {
    return Math.round(
      0.5 * g.thirds +
      0.5 * g.mid
    );
  }
  
  export function midfaceScore(g : GPTGeometryScores) {
    return Math.round(
      0.7 * g.mid +
      0.3 * g.overall
    );
  }
  