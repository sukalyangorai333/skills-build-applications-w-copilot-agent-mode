"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.baseUrl = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const routes_1 = __importDefault(require("./routes"));
exports.app = (0, express_1.default)();
const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';
const codespaceName = process.env.CODESPACE_NAME;
exports.baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
exports.app.use(express_1.default.json());
exports.app.use(routes_1.default);
exports.app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', baseUrl: exports.baseUrl });
});
const startServer = async () => {
    try {
        await mongoose_1.default.connect(MONGO_URI);
        console.log('MongoDB connected');
        exports.app.listen(PORT, () => {
            console.log(`Backend listening on port ${PORT}`);
        });
    }
    catch (error) {
        console.error('MongoDB connection failed', error);
    }
};
startServer();
