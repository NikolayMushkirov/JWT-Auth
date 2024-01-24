"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ACCESS_TOKEN_EXPIRATION = exports.COOKIE_SETTINGS = void 0;
exports.COOKIE_SETTINGS = {
    REFRESH_TOKEN: {
        httpOnly: true,
        maxAge: 1296e6, //15 days
    },
};
exports.ACCESS_TOKEN_EXPIRATION = 18e5; // 30 min
