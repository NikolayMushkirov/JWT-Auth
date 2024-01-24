"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var pg_1 = __importDefault(require("pg"));
var pool = new pg_1.default.Pool({
    user: "postgres",
    password: "root",
    host: "localhost",
    port: 5432,
    database: "auth",
});
exports.default = pool;
