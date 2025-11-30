"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildFullRatings = buildFullRatings;
const jawline_js_1 = require("./calculations/jawline.js");
const eyes_js_1 = require("./calculations/eyes.js");
const nose_js_1 = require("./calculations/nose.js");
const lips_js_1 = require("./calculations/lips.js");
const symmetry_js_1 = require("./calculations/symmetry.js");
const ratios_js_1 = require("./calculations/ratios.js");
const overall_js_1 = require("./calculations/overall.js");
const tier_js_1 = require("./calculations/tier.js");
function buildFullRatings(g) {
    const jaw = (0, jawline_js_1.jawlineScore)(g);
    const eyes = (0, eyes_js_1.eyeScore)(g);
    const nose = (0, nose_js_1.noseScore)(g);
    const lips = (0, lips_js_1.lipScore)(g);
    const symmetry = (0, symmetry_js_1.symmetryScore)(g);
    const gr = (0, ratios_js_1.goldenRatioScore)(g);
    const midface = (0, ratios_js_1.midfaceScore)(g);
    const attractiveness100 = (0, overall_js_1.overallAttractiveness)(g);
    const attractiveness10 = (0, tier_js_1.tierFrom100)(attractiveness100);
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
//# sourceMappingURL=index.js.map