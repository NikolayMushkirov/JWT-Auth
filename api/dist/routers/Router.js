"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var AuthValidator_js_1 = require("../validators/AuthValidator.js");
var AuthController_js_1 = require("../controllers/AuthController.js");
var router = (0, express_1.Router)();
router.post("/sign-in", AuthValidator_js_1.AuthValidator.signIn, AuthController_js_1.AuthController.signIn);
router.post("/sign-up", AuthValidator_js_1.AuthValidator.signUp, AuthController_js_1.AuthController.signUp);
router.post("/logout", AuthValidator_js_1.AuthValidator.logOut, AuthController_js_1.AuthController.logOut);
router.post("/refresh", AuthValidator_js_1.AuthValidator.refresh, AuthController_js_1.AuthController.refresh);
exports.default = router;
