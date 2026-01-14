"use strict";
// geometry3dScores.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseLandmarks = parseLandmarks;
exports.computeGeometry3DScores = computeGeometry3DScores;
exports.computeScoresFromJSON = computeScoresFromJSON;
const engine_1 = require("../engine");
// 3D Euclidean distance
const D = (a, b) => {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    const dz = a.z - b.z;
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
};
// angle using 2D projection only (x,y)
const angle = (a, b) => {
    return Math.abs(Math.atan2(b.y - a.y, b.x - a.x));
};
const range = (a, b) => [...Array(b - a + 1)].map((_, i) => a + i);
const ASYM = (pts, A, B) => {
    if (A.length === 0 || B.length === 0) {
        return 0;
    }
    let sum = 0;
    let count = 0;
    for (const i of A) {
        for (const j of B) {
            if (i < pts.length && j < pts.length && i >= 0 && j >= 0) {
                const di = D(pts[i], pts[1]);
                const dj = D(pts[j], pts[1]);
                sum += Math.abs(di - dj);
                count++;
            }
        }
    }
    return count > 0 ? sum / count : 0;
};
/**
 * Parses landmark input from JSON format to Landmark type
 */
function parseLandmarks(input) {
    // If it's already a Landmark array, return as is
    if (Array.isArray(input)) {
        return input;
    }
    // If it's an object with landmarks property, extract it
    if (input && typeof input === 'object' && 'landmarks' in input) {
        return input.landmarks;
    }
    throw new Error("Invalid landmark input format. Expected { landmarks: [...] } or Landmark array");
}
/**
 * Computes 3D geometry scores from facial landmarks
 */
function computeGeometry3DScores(pts) {
    var _a, _b, _c;
    if (!pts || pts.length < 468) {
        throw new Error("468 FaceMesh landmarks required");
    }
    // Validate landmark structure
    for (let i = 0; i < Math.min(pts.length, 468); i++) {
        if (typeof ((_a = pts[i]) === null || _a === void 0 ? void 0 : _a.x) !== 'number' || typeof ((_b = pts[i]) === null || _b === void 0 ? void 0 : _b.y) !== 'number' || typeof ((_c = pts[i]) === null || _c === void 0 ? void 0 : _c.z) !== 'number') {
            throw new Error(`Invalid landmark at index ${i}. Expected {x, y, z} object`);
        }
    }
    /* --------------------------------------------------
     * Global scale (still used for asymmetry-based metrics)
     * -------------------------------------------------- */
    let M = 0;
    for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
            const dist = D(pts[i], pts[j]);
            if (dist > M)
                M = dist;
        }
    }
    // Prevent division by zero
    if (M === 0) {
        M = 1;
    }
    /* --------------------------------------------------
     * Local facial reference scales
     * -------------------------------------------------- */
    // Validate critical landmark indices exist
    const requiredIndices = [1, 4, 10, 13, 14, 27, 33, 50, 61, 70, 94, 133, 152, 159, 197, 205, 234, 257, 263, 280, 291, 336, 360, 362, 386, 425, 454, 467];
    for (const idx of requiredIndices) {
        if (idx >= pts.length) {
            throw new Error(`Required landmark index ${idx} is out of bounds. Only ${pts.length} landmarks provided.`);
        }
    }
    const FACE_HEIGHT = D(pts[10], pts[152]); // forehead → chin
    const FACE_WIDTH = D(pts[234], pts[454]); // cheek → cheek
    const MOUTH_WIDTH = D(pts[61], pts[291]);
    const LIP_OPEN = D(pts[13], pts[14]);
    /* --------------------------------------------------
     * Metrics (unchanged ones stay unchanged)
     * -------------------------------------------------- */
    const jaw = 100 * (1 - ASYM(pts, range(234, 253), range(454, 467)) / M);
    const brow = 100 * (1 - ASYM(pts, range(70, 94), range(336, 360)) / M);
    const eye = 100 * (1 - ASYM(pts, range(33, 133), range(263, 362)) / M);
    const nose = 100 * (1 -
        Math.abs(D(pts[1], pts[4]) -
            D(pts[1], pts[197])) / M);
    const clar = 100 * (1 - ASYM(pts, range(0, 233), range(234, 467)) / M);
    const puff = 100 * (1 -
        Math.abs(D(pts[205], pts[50]) -
            D(pts[425], pts[280])) / M);
    const ret = 100 * (1 -
        Math.abs(D(pts[152], pts[234]) -
            D(pts[152], pts[454])) / M);
    const sleep = 100 * (1 -
        Math.abs(D(pts[159], pts[27]) -
            D(pts[386], pts[257])) / M);
    const tilt = 100 * (1 - Math.abs(angle(pts[33], pts[263])) / Math.PI);
    /* --------------------------------------------------
     * FIXED METRICS
     * -------------------------------------------------- */
    // Mouth proportion (so "normal" mouths don't get 0)
    const idealMouthRatio = 0.38;
    const mouthRatio = FACE_WIDTH > 0 ? MOUTH_WIDTH / FACE_WIDTH : 0;
    const mouthDeviation = Math.abs(mouthRatio - idealMouthRatio) / idealMouthRatio;
    // Soft penalty and soft floor so almost‑normal mouths stay in 40–90 range
    const mouthRaw = 100 * (1 - mouthDeviation * 0.6);
    const mouth = Math.max(20, Math.min(95, mouthRaw));
    // Smile = lip openness. Maximum boost for good faces:
    // - very small opening  (ratio <= 0.002) → ~55
    // - moderate opening    (ratio ~ 0.015)  → ~88
    // - big smile           (ratio >= 0.025) → ~98
    const lipOpenRatio = FACE_HEIGHT > 0 ? LIP_OPEN / FACE_HEIGHT : 0;
    const smileNorm = Math.min(Math.max((lipOpenRatio - 0.002) / 0.023, 0), 1);
    const smile = 55 + 43 * smileNorm; // 55–98 range
    // Chin projection using depth (z-axis), wider band and capped to avoid 100
    const chinDepth = pts[152].z - pts[1].z;
    // Map roughly [-0.035, 0.035] → [0, 1]
    const chinNorm = (chinDepth + 0.035) / 0.07;
    const chinRaw = 100 * Math.min(Math.max(chinNorm, 0), 1);
    // Keep typical chins away from hard 0/100
    const chin = Math.max(15, Math.min(90, chinRaw));
    // Face thirds as ratio, not absolute difference
    const upperFace = D(pts[10], pts[1]);
    const lowerFace = D(pts[1], pts[152]);
    const thirds = lowerFace > 0
        ? 100 * Math.max(0, 1 - Math.abs(upperFace / lowerFace - 1))
        : 0;
    const mid = thirds;
    /* --------------------------------------------------
     * Aggregate
     * -------------------------------------------------- */
    const values = [
        jaw,
        mouth,
        smile,
        brow,
        eye,
        nose,
        chin,
        tilt,
        thirds,
        mid,
        clar,
        puff,
        ret,
        sleep
    ];
    const overall = values.reduce((a, b) => a + b, 0) / values.length;
    const r = (v) => Number(v.toFixed(2));
    const cal = {
        overall: r(overall),
        thirds: r(thirds),
        mid: r(mid),
        jaw: r(jaw),
        puff: r(puff),
        ret: r(ret),
        clar: r(clar),
        sleep: r(sleep),
        smile: r(smile),
        brow: r(brow),
        eye: r(eye),
        nose: r(nose),
        mouth: r(mouth),
        chin: r(chin),
        tilt: r(tilt)
    };
    const scores = (0, engine_1.buildFullRatings)(cal);
    return {
        model: cal,
        fullrating: scores
    };
}
/**
 * Convenience function that accepts JSON input format and computes scores
 */
function computeScoresFromJSON(input) {
    const landmarks = parseLandmarks(input);
    return computeGeometry3DScores(landmarks);
}
//# sourceMappingURL=geometry3dScores.js.map