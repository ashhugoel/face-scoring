import type { Landmark } from "../types/engine.js";
import type { GPTGeometryScores } from "../types/scores.js";
export declare function modelRun(landmark: Landmark): Promise<{
    model: GPTGeometryScores;
    fullrating: {
        jaw: number;
        eyes: number;
        nose: number;
        lips: number;
        symmetry: number;
        goldenRatio: number;
        midface: number;
        attractiveness100: number;
        attractiveness10: number;
    };
} | undefined>;
//# sourceMappingURL=openai.client.d.ts.map