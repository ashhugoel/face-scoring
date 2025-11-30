"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eyeScore = eyeScore;
function eyeScore(g) {
    return Math.round(0.50 * g.eye +
        0.30 * g.brow +
        0.20 * g.clar);
}
//# sourceMappingURL=eyes.js.map