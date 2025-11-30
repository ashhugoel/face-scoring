import { jawlineScore } from "./jawline.js";
import { eyeScore } from "./eyes.js";
import { symmetryScore } from "./symmetry.js";
import { noseScore } from "./nose.js";
import { lipScore } from "./lips.js";
export function overallAttractiveness(g) {
    return Math.round(0.25 * jawlineScore(g) +
        0.25 * eyeScore(g) +
        0.20 * symmetryScore(g) +
        0.15 * noseScore(g) +
        0.15 * lipScore(g));
}
//# sourceMappingURL=overall.js.map