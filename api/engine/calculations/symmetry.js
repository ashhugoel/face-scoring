export function symmetryScore(g) {
    return Math.round(0.35 * g.tilt +
        0.25 * g.thirds +
        0.20 * g.eye +
        0.20 * g.jaw);
}
//# sourceMappingURL=symmetry.js.map