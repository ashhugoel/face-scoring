"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.goldenRatioScore = goldenRatioScore;
exports.midfaceScore = midfaceScore;
function goldenRatioScore(g) {
    return Math.round(0.5 * g.thirds +
        0.5 * g.mid);
}
function midfaceScore(g) {
    return Math.round(0.7 * g.mid +
        0.3 * g.overall);
}
//# sourceMappingURL=ratios.js.map