import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Fingerprint from "express-fingerprint";
import AuthRootRouter from "./routers/Router.js";
import cookieParser from "cookie-parser";
dotenv.config();
var PORT = process.env.PORT || 5000;
var app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }));
app.use(Fingerprint({
    parameters: [Fingerprint.useragent, Fingerprint.acceptHeaders],
}));
app.use("/auth", AuthRootRouter);
app.listen(PORT, function () {
    console.log("Сервер успешно запущен");
});
