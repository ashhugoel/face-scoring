"use strict";
// geometry3dScores.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.computeGeometry3DScores = computeGeometry3DScores;
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
    let sum = 0;
    let count = 0;
    for (const i of A) {
        for (const j of B) {
            const di = D(pts[i], pts[1]);
            const dj = D(pts[j], pts[1]);
            sum += Math.abs(di - dj);
            count++;
        }
    }
    return sum / count;
};
function computeGeometry3DScores(pts) {
    console.log(pts);
    if (pts.length < 468)
        throw new Error("468 FaceMesh landmarks required");
    // Compute M (max 3D distance)
    let M = 0;
    for (let i = 0; i < pts.length; i++) {
        for (let j = 0; j < pts.length; j++) {
            const dist = D(pts[i], pts[j]);
            if (dist > M)
                M = dist;
        }
    }
    const jaw = 100 * (1 - ASYM(pts, range(234, 253), range(454, 467)) / M);
    const lips = 100 * (1 - D(pts[61], pts[291]) / M);
    const smile = lips;
    const brow = 100 * (1 - ASYM(pts, range(70, 94), range(336, 360)) / M);
    const eye = 100 * (1 - ASYM(pts, range(33, 133), range(263, 362)) / M);
    const nose = 100 * (1 -
        Math.abs(D(pts[1], pts[4]) -
            D(pts[1], pts[197])) / M);
    const mouth = lips;
    const chin = 100 * (1 - Math.abs(D(pts[152], pts[7])) / M);
    const tilt = 100 * (1 - Math.abs(angle(pts[33], pts[263])) / Math.PI);
    const thirds = 100 * (1 -
        Math.abs(D(pts[10], pts[152]) -
            D(pts[152], pts[175])) / M);
    const mid = thirds;
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
    const values = [
        jaw,
        lips,
        smile,
        brow,
        eye,
        nose,
        mouth,
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
//# sourceMappingURL=geometry3dScores.js.map