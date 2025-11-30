import { jawlineScore } from "./calculations/jawline.js";
import { eyeScore } from "./calculations/eyes.js";
import { noseScore } from "./calculations/nose.js";
import { lipScore } from "./calculations/lips.js";
import { symmetryScore } from "./calculations/symmetry.js";
import { goldenRatioScore, midfaceScore } from "./calculations/ratios.js";
import { overallAttractiveness } from "./calculations/overall.js";
import { tierFrom100 } from "./calculations/tier.js";
import type { GPTGeometryScores } from "../types/scores.js";


export function buildFullRatings(g : GPTGeometryScores) {
  const jaw = jawlineScore(g);
  const eyes = eyeScore(g);
  const nose = noseScore(g);
  const lips = lipScore(g);
  const symmetry = symmetryScore(g);
  const gr = goldenRatioScore(g);
  const midface = midfaceScore(g);

  const attractiveness100 = overallAttractiveness(g);
  const attractiveness10 = tierFrom100(attractiveness100);

  return {
    jaw,
    eyes,
    nose,
    lips,
    symmetry,
    goldenRatio: gr,
    midface,
    attractiveness100,
    attractiveness10
  };
}
