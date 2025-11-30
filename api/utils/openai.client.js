import OpenAI from "openai";
import { GEOMETRY_INSTRUCTIONS } from "../config/env.js";
import { buildFullRatings } from "../engine/index.js";
import { normalize } from "./util.js";
import dotenv from "dotenv";
dotenv.config();
const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});
export async function modelRun(landmark) {
    console.log("running....");
    const landmarks = normalize(landmark);
    // console.log(landmarks)
    try {
        const response = await client.responses.create({
            model: "gpt-4o-mini",
            instructions: GEOMETRY_INSTRUCTIONS,
            prompt_cache_key: "geom-v1",
            //@ts-ignore
            // prompt_cache_retention: "in_memory",
            input: [
                {
                    role: "user",
                    content: `L=${landmarks}`
                }
            ],
            text: {
                format: {
                    name: "scores",
                    type: 'json_schema', strict: true,
                    schema: {
                        type: "object",
                        properties: {
                            overall: { type: "number", minimum: 1, maximum: 100 },
                            thirds: { type: "number", minimum: 1, maximum: 100 },
                            mid: { type: "number", minimum: 1, maximum: 100 },
                            jaw: { type: "number", minimum: 1, maximum: 100 },
                            puff: { type: "number", minimum: 1, maximum: 100 },
                            ret: { type: "number", minimum: 1, maximum: 100 },
                            clar: { type: "number", minimum: 1, maximum: 100 },
                            sleep: { type: "number", minimum: 1, maximum: 100 },
                            smile: { type: "number", minimum: 1, maximum: 100 },
                            brow: { type: "number", minimum: 1, maximum: 100 },
                            eye: { type: "number", minimum: 1, maximum: 100 },
                            nose: { type: "number", minimum: 1, maximum: 100 },
                            mouth: { type: "number", minimum: 1, maximum: 100 },
                            chin: { type: "number", minimum: 1, maximum: 100 },
                            tilt: { type: "number", minimum: 1, maximum: 100 }
                        },
                        required: [
                            "overall",
                            "thirds",
                            "mid",
                            "jaw",
                            "puff",
                            "ret",
                            "clar",
                            "sleep",
                            "smile",
                            "brow",
                            "eye",
                            "nose",
                            "mouth",
                            "chin",
                            "tilt"
                        ],
                        additionalProperties: false
                    }
                }
            },
            temperature: 0,
            max_output_tokens: 2084
        });
        console.log("Result:");
        console.log(response.usage);
        console.log(response.output_text);
        const gpt = JSON.parse(response.output_text);
        const scores = buildFullRatings(gpt);
        console.log(scores);
        return {
            model: gpt,
            fullrating: scores
        };
    }
    catch (error) {
        console.error("Error occurred:");
        console.error(error);
    }
}
//# sourceMappingURL=openai.client.js.map