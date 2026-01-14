import express from "express";
import dotenv from "dotenv";
import { authMiddleware } from "./middleware/authentication.js";
import jwt from "jsonwebtoken";
import { rateLimiter } from "./middleware/ratelimiter.js";
import { modelRun } from "./utils/openai.client.js";
import serverless from "serverless-http";
import { computeGeometry3DScores, computeScoresFromJSON } from "./utils/geometry3dScores.js";

dotenv.config();

const app = express()
app.use(rateLimiter)
app.use(express.json());



app.get("/jwt", (_, res) => {
  const date = new Date().toISOString();
  const secret = process.env.JWT_SECRET!;
  const token = jwt.sign({ date }, secret);

  res.json({ jwt: token })
})



app.post("/", authMiddleware , async (req, res) => {
  // const result = await modelRun(req.body.landmarks)

  const result = computeScoresFromJSON(req.body.landmarks) 
  res.json(result)
}) 


// export const handler = serverless(app);
// export default handler;


app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});