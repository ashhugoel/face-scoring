import type { GPTGeometryScores } from "../types/scores.js";


export function mapGPTToEngine(g: GPTGeometryScores) {
  return {
    // Engine uses these:
    jaw: g.jaw,
    eyes: g.eye,
    nose: g.nose,
    lips: g.mouth,

    symmetry: g.overall,
    goldenRatio: g.thirds,
    midface: g.mid,

    // secondary metrics (optional)
    puff: g.puff,
    retention: g.ret,
    clarity: g.clar,
    tiredness: g.sleep,
    smile: g.smile,
    brow: g.brow,
    chin: g.chin,
    tilt: g.tilt,

    // Attractiveness score (your tier system)
    attractiveness100: Math.round(
      (g.eye + g.nose + g.jaw + g.chin + g.mid + g.overall) / 6
    ),
    attractiveness10: Math.round(
      ((g.eye + g.nose + g.jaw + g.chin + g.mid + g.overall) / 6) / 10
    )
  };
}
