"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.modelRun = modelRun;
const openai_1 = __importDefault(require("openai"));
const env_js_1 = require("../config/env.js");
const index_js_1 = require("../engine/index.js");
const util_js_1 = require("./util.js");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const client = new openai_1.default({
    apiKey: process.env.OPENAI_API_KEY,
});
function modelRun(landmark) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("running....");
        const landmarks = (0, util_js_1.normalize)(landmark);
        // console.log(landmarks)
        try {
            const response = yield client.responses.create({
                model: "gpt-4o-mini",
                instructions: env_js_1.GEOMETRY_INSTRUCTIONS,
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
            const scores = (0, index_js_1.buildFullRatings)(gpt);
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
    });
}
//# sourceMappingURL=openai.client.js.map