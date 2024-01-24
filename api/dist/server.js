"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var dotenv_1 = __importDefault(require("dotenv"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var Router_js_1 = __importDefault(require("./routers/Router.js"));
var TokenService_js_1 = require("./services/TokenService.js");
var Fingerprint = require("express-fingerprint");
dotenv_1.default.config();
var PORT = process.env.PORT || 5000;
var app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use((0, cors_1.default)({ credentials: true, origin: process.env.CLIENT_URL }));
app.use(Fingerprint({
    parameters: [Fingerprint.useragent, Fingerprint.acceptHeaders],
}));
app.use("/auth", Router_js_1.default);
app.get("/resource/protected", TokenService_js_1.TokenService.checkAccess, function (_, res) {
    res.status(200).json("Добро пожаловать!" + Date.now());
});
app.listen(PORT, function () {
    console.log("Сервер успешно запущен");
});
