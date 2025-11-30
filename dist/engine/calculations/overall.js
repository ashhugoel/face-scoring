"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.overallAttractiveness = overallAttractiveness;
const jawline_js_1 = require("./jawline.js");
const eyes_js_1 = require("./eyes.js");
const symmetry_js_1 = require("./symmetry.js");
const nose_js_1 = require("./nose.js");
const lips_js_1 = require("./lips.js");
function overallAttractiveness(g) {
    return Math.round(0.25 * (0, jawline_js_1.jawlineScore)(g) +
        0.25 * (0, eyes_js_1.eyeScore)(g) +
        0.20 * (0, symmetry_js_1.symmetryScore)(g) +
        0.15 * (0, nose_js_1.noseScore)(g) +
        0.15 * (0, lips_js_1.lipScore)(g));
}
//# sourceMappingURL=overall.js.map