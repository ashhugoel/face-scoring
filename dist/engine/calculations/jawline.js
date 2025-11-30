"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jawlineScore = jawlineScore;
function jawlineScore(g) {
    return Math.round(0.45 * g.jaw +
        0.25 * g.chin +
        0.15 * g.tilt +
        0.15 * g.overall);
}
//# sourceMappingURL=jawline.js.map