import type { GPTGeometryScores } from "../../types/scores.js";

export function noseScore(g  : GPTGeometryScores) {
    return Math.round(
      0.70 * g.nose +
      0.30 * g.mid
    );
  }
  