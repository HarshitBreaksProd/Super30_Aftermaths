"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authControllers_1 = require("../controllers/authControllers");
const router = (0, express_1.Router)();
router.route("/signup").post(authControllers_1.signupController);
router.route("/signin").post(authControllers_1.signinController);
exports.default = router;
