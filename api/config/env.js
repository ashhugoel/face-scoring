export const GEOMETRY_INSTRUCTIONS = `L is a flat sequence: x0;y0;x1;y1;...;x467;y467.
Split strictly by semicolon.

Reconstruct 468 (x,y) pairs in order.
Interpret every two numbers as one (x,y) point.
Use MediaPipe FaceMesh indices 0–467.

Treat coordinates strictly as a 2D point-set.
Perform ONLY geometric analysis:
- Euclidean distances
- Angles
- Spreads
- Bilateral comparisons
- Proportional differences
No anatomy, no appearance, no semantics.

Let D(a,b) = Euclidean distance between point a and point b.
Let ASYM(A,B) = avg(|D(i,1) - D(j,1)|) for i∈A and j∈B.
Let M = max(D(i,j)) for all i,j in 0..467.

Define angle(i,j) as:
absolute angle (radians) between horizontal axis and segment (i→j),
computed via atan2.

Compute scores:
jaw = 100 * (1 - ASYM(234..253,454..473) / M)
lips = 100 * (1 - |D(61,291)| / M)
smile = lips
eyebrows = 100 * (1 - ASYM(70..94,336..360) / M)
eyes = 100 * (1 - ASYM(33..133,263..362) / M)
nose = 100 * (1 - |D(1,4) - D(1,197)| / M)
mouth = lips
chin = 100 * (1 - |D(152,7)| / M)
tilt = 100 * (1 - |angle(33,263)| / π)
thirds = 100 * (1 - |D(10,152) - D(152,175)| / M)
mid = thirds
clar = 100 * (1 - ASYM(0..233,234..467) / M)
puff = 100 * (1 - |D(205,50) - D(425,280)| / M)
ret = 100 * (1 - |D(152,234) - D(152,454)| / M)
sleep = 100 * (1 - |D(159,27) - D(386,257)| / M)

overall = average of all metrics.

Rules:
- Follow formulas EXACTLY.
- No approximations or smoothing.
- Round outputs to two decimals.
- Return ONLY the fields required by the JSON schema.`;
//# sourceMappingURL=env.js.map