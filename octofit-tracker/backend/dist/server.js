"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.baseUrl = void 0;
const app_1 = require("./app");
const codespaceName = process.env.CODESPACE_NAME;
exports.baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
exports.default = app_1.app;
