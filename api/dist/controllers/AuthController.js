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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
var constants_js_1 = require("../constants.js");
var AuthService_js_1 = require("../services/AuthService.js");
var Errors_js_1 = require("../utils/Errors.js");
var AuthController = /** @class */ (function () {
    function AuthController() {
    }
    AuthController.signIn = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, userName, password, fingerprint, _b, accessToken, refreshToken, accessTokenExpiration, error_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = req.body, userName = _a.userName, password = _a.password;
                        fingerprint = req.fingerprint;
                        if (!fingerprint) {
                            return [2 /*return*/, res.status(400).json({ message: "Fingerprint not provided" })];
                        }
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, AuthService_js_1.AuthService.signIn({
                                userName: userName,
                                password: password,
                                fingerprint: fingerprint,
                            })];
                    case 2:
                        _b = _c.sent(), accessToken = _b.accessToken, refreshToken = _b.refreshToken, accessTokenExpiration = _b.accessTokenExpiration;
                        res.cookie("refreshToken", refreshToken, constants_js_1.COOKIE_SETTINGS.REFRESH_TOKEN);
                        return [2 /*return*/, res.status(200).json({ accessToken: accessToken, accessTokenExpiration: accessTokenExpiration })];
                    case 3:
                        error_1 = _c.sent();
                        if (error_1 instanceof Errors_js_1.WebError)
                            return [2 /*return*/, Errors_js_1.ErrorsUtils.catchError(res, error_1)];
                        return [2 /*return*/, console.log(error_1)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AuthController.signUp = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, userName, password, role, fingerprint, _b, accessToken, refreshToken, accessTokenExpiration, error_2;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = req.body, userName = _a.userName, password = _a.password, role = _a.role;
                        fingerprint = req.fingerprint;
                        if (!fingerprint) {
                            return [2 /*return*/, res.status(400).json({ message: "Fingerprint not provided" })];
                        }
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, AuthService_js_1.AuthService.signUp({ userName: userName, password: password, role: role, fingerprint: fingerprint })];
                    case 2:
                        _b = _c.sent(), accessToken = _b.accessToken, refreshToken = _b.refreshToken, accessTokenExpiration = _b.accessTokenExpiration;
                        res.cookie("refreshToken", refreshToken, constants_js_1.COOKIE_SETTINGS.REFRESH_TOKEN);
                        return [2 /*return*/, res.status(200).json({ accessToken: accessToken, accessTokenExpiration: accessTokenExpiration })];
                    case 3:
                        error_2 = _c.sent();
                        if (error_2 instanceof Errors_js_1.WebError) {
                            return [2 /*return*/, Errors_js_1.ErrorsUtils.catchError(res, error_2)];
                        }
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AuthController.logOut = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var refreshToken, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        refreshToken = req.cookies.refreshToken;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, AuthService_js_1.AuthService.logOut(refreshToken)];
                    case 2:
                        _a.sent();
                        res.clearCookie("refreshToken");
                        return [2 /*return*/, res.sendStatus(200)];
                    case 3:
                        error_3 = _a.sent();
                        if (error_3 instanceof Errors_js_1.WebError) {
                            return [2 /*return*/, Errors_js_1.ErrorsUtils.catchError(res, error_3)];
                        }
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AuthController.refresh = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var fingerprint, currentRefreshToken, _a, accessToken, refreshToken, accessTokenExpiration, error_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        fingerprint = req.fingerprint;
                        currentRefreshToken = req.cookies.refreshToken;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, AuthService_js_1.AuthService.refresh({
                                currentRefreshToken: currentRefreshToken,
                                fingerprint: fingerprint,
                            })];
                    case 2:
                        _a = _b.sent(), accessToken = _a.accessToken, refreshToken = _a.refreshToken, accessTokenExpiration = _a.accessTokenExpiration;
                        res.cookie("refreshToken", refreshToken, constants_js_1.COOKIE_SETTINGS.REFRESH_TOKEN);
                        return [2 /*return*/, res.status(200).json({ accessToken: accessToken, accessTokenExpiration: accessTokenExpiration })];
                    case 3:
                        error_4 = _b.sent();
                        if (error_4 instanceof Errors_js_1.WebError) {
                            return [2 /*return*/, Errors_js_1.ErrorsUtils.catchError(res, error_4)];
                        }
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return AuthController;
}());
exports.AuthController = AuthController;
