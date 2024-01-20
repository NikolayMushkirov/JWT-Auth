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
import bcrypt from "bcryptjs";
import { UserRepository } from "../repositories/UserRepository.js";
import { RefreshSessionRepository } from "../repositories/RefreshSessionRepository.js";
import { TokenService } from "./TokenService.js";
import { Conflict, Forbidden, NotFound, Unauthorized, } from "../utils/Errors.js";
import { ACCESS_TOKEN_EXPIRATION } from "../constants.js";
var AuthService = /** @class */ (function () {
    function AuthService() {
    }
    AuthService.signIn = function (_a) {
        var userName = _a.userName, password = _a.password, fingerprint = _a.fingerprint;
        return __awaiter(this, void 0, void 0, function () {
            var userData, isPasswordValid, payload, accessToken, refreshToken;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, UserRepository.getUserData(userName)];
                    case 1:
                        userData = _b.sent();
                        if (!userData) {
                            throw new NotFound("Пользователь не найден");
                        }
                        isPasswordValid = bcrypt.compareSync(password, userData.password);
                        if (!isPasswordValid) {
                            throw new Forbidden("Неверное имя или пароль");
                        }
                        payload = { role: userData.role, id: userData.id, userName: userName };
                        return [4 /*yield*/, TokenService.generateAccessToken(payload)];
                    case 2:
                        accessToken = _b.sent();
                        return [4 /*yield*/, TokenService.generateRefreshToken(payload)];
                    case 3:
                        refreshToken = _b.sent();
                        return [4 /*yield*/, RefreshSessionRepository.createRefreshSession({
                                id: userData.id,
                                refreshToken: refreshToken,
                                fingerprint: fingerprint,
                            })];
                    case 4:
                        _b.sent();
                        return [2 /*return*/, {
                                accessToken: accessToken,
                                refreshToken: refreshToken,
                                accessTokenExpiration: ACCESS_TOKEN_EXPIRATION,
                            }];
                }
            });
        });
    };
    AuthService.signUp = function (_a) {
        var userName = _a.userName, password = _a.password, fingerprint = _a.fingerprint, role = _a.role;
        return __awaiter(this, void 0, void 0, function () {
            var userData, hashedPassword, id, payload, accessToken, refreshToken;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, UserRepository.getUserData(userName)];
                    case 1:
                        userData = _b.sent();
                        if (userData) {
                            throw new Conflict("Пользователь с таким именем уже существует");
                        }
                        hashedPassword = bcrypt.hashSync(password, 8);
                        return [4 /*yield*/, UserRepository.createUser({
                                userName: userName,
                                hashedPassword: hashedPassword,
                                role: role,
                            })];
                    case 2:
                        id = (_b.sent()).id;
                        payload = { id: id, userName: userName, role: role };
                        return [4 /*yield*/, TokenService.generateAccessToken(payload)];
                    case 3:
                        accessToken = _b.sent();
                        return [4 /*yield*/, TokenService.generateRefreshToken(payload)];
                    case 4:
                        refreshToken = _b.sent();
                        return [4 /*yield*/, RefreshSessionRepository.createRefreshSession({
                                id: id,
                                refreshToken: refreshToken,
                                fingerprint: fingerprint,
                            })];
                    case 5:
                        _b.sent();
                        return [2 /*return*/, {
                                accessToken: accessToken,
                                refreshToken: refreshToken,
                                accessTokenExpiration: ACCESS_TOKEN_EXPIRATION,
                            }];
                }
            });
        });
    };
    AuthService.logOut = function (refreshToken) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, RefreshSessionRepository.deleteRefreshSession(refreshToken)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AuthService.refresh = function (_a) {
        var fingerprint = _a.fingerprint, currentRefreshToken = _a.currentRefreshToken;
        return __awaiter(this, void 0, void 0, function () {
            var refreshSession, payload, error_1, _b, id, role, userName, actualPayload, accessToken, refreshToken;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!currentRefreshToken) {
                            throw new Unauthorized("Unauthorized");
                        }
                        return [4 /*yield*/, RefreshSessionRepository.getRefreshSession(currentRefreshToken)];
                    case 1:
                        refreshSession = _c.sent();
                        if (!refreshSession) {
                            throw new Unauthorized("Unauthorized");
                        }
                        if (refreshSession.finger_print !== fingerprint.hash) {
                            console.log("Попытка несанкционированного обновления токенов");
                            throw new Forbidden("Forbidden");
                        }
                        return [4 /*yield*/, RefreshSessionRepository.deleteRefreshSession(currentRefreshToken)];
                    case 2:
                        _c.sent();
                        _c.label = 3;
                    case 3:
                        _c.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, TokenService.verifyRefreshToken(currentRefreshToken)];
                    case 4:
                        payload = _c.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        error_1 = _c.sent();
                        throw new Forbidden("Forbidden");
                    case 6: return [4 /*yield*/, UserRepository.getUserData(payload.userName)];
                    case 7:
                        _b = _c.sent(), id = _b.id, role = _b.role, userName = _b.name;
                        console.log(payload, "payload");
                        actualPayload = { id: id, userName: userName, role: role };
                        return [4 /*yield*/, TokenService.generateAccessToken(actualPayload)];
                    case 8:
                        accessToken = _c.sent();
                        return [4 /*yield*/, TokenService.generateRefreshToken(actualPayload)];
                    case 9:
                        refreshToken = _c.sent();
                        return [4 /*yield*/, RefreshSessionRepository.createRefreshSession({
                                id: id,
                                refreshToken: refreshToken,
                                fingerprint: fingerprint,
                            })];
                    case 10:
                        _c.sent();
                        return [2 /*return*/, {
                                accessToken: accessToken,
                                refreshToken: refreshToken,
                                accessTokenExpiration: ACCESS_TOKEN_EXPIRATION,
                            }];
                }
            });
        });
    };
    return AuthService;
}());
export { AuthService };
