export function goldenRatioScore(g) {
    return Math.round(0.5 * g.thirds +
        0.5 * g.mid);
}
export function midfaceScore(g) {
    return Math.round(0.7 * g.mid +
        0.3 * g.overall);
}
//# sourceMappingURL=ratios.js.map