import type { GPTGeometryScores } from "../../types/scores.js";

export function lipScore(g : GPTGeometryScores) {
    return Math.round(
      0.60 * g.mouth +
      0.40 * g.smile
    );
  }
  