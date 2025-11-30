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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const authentication_js_1 = require("./middleware/authentication.js");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ratelimiter_js_1 = require("./middleware/ratelimiter.js");
const openai_client_js_1 = require("./utils/openai.client.js");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(ratelimiter_js_1.rateLimiter);
app.use(express_1.default.json());
app.get("/jwt", (_, res) => {
    const date = new Date().toISOString();
    const secret = process.env.JWT_SECRET;
    const token = jsonwebtoken_1.default.sign({ date }, secret);
    res.json({ jwt: token });
});
app.post("/", authentication_js_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, openai_client_js_1.modelRun)(req.body.landmarks);
    res.json(result);
}));
// export const handler = serverless(app);
// export default handler;
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
//# sourceMappingURL=index.js.map