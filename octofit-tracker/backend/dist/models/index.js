"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.sampleLeaderboardEntries = exports.sampleWorkouts = exports.sampleActivities = exports.sampleTeams = exports.sampleUsers = exports.LeaderboardEntry = exports.Workout = exports.Activity = exports.Team = exports.User = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    fitnessLevel: { type: String, default: 'beginner' },
    teamId: { type: String, default: '' },
}, { timestamps: true });
const teamSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    goal: { type: String, required: true },
    members: { type: [String], default: [] },
}, { timestamps: true });
const activitySchema = new mongoose_1.Schema({
    userId: { type: String, required: true },
    type: { type: String, required: true },
    duration: { type: Number, required: true },
    distance: { type: Number, default: 0 },
    calories: { type: Number, default: 0 },
}, { timestamps: true });
const workoutSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    duration: { type: Number, required: true },
    difficulty: { type: String, default: 'moderate' },
    focusArea: { type: String, default: 'full-body' },
}, { timestamps: true });
const leaderboardEntrySchema = new mongoose_1.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    score: { type: Number, required: true },
    rank: { type: Number, required: true },
}, { timestamps: true });
exports.User = mongoose_1.default.model('User', userSchema);
exports.Team = mongoose_1.default.model('Team', teamSchema);
exports.Activity = mongoose_1.default.model('Activity', activitySchema);
exports.Workout = mongoose_1.default.model('Workout', workoutSchema);
exports.LeaderboardEntry = mongoose_1.default.model('LeaderboardEntry', leaderboardEntrySchema);
exports.sampleUsers = [
    { name: 'Maya Chen', email: 'maya@example.com', fitnessLevel: 'advanced' },
    { name: 'Luis Rivera', email: 'luis@example.com', fitnessLevel: 'intermediate' },
];
exports.sampleTeams = [
    { name: 'North Star', goal: 'Complete 100 km this month', members: ['maya@example.com', 'luis@example.com'] },
];
exports.sampleActivities = [
    { userId: 'maya@example.com', type: 'run', duration: 35, distance: 5.2, calories: 320 },
    { userId: 'luis@example.com', type: 'strength', duration: 45, calories: 280 },
];
exports.sampleWorkouts = [
    { name: 'HIIT Circuit', duration: 25, difficulty: 'advanced', focusArea: 'cardio' },
    { name: 'Mobility Flow', duration: 20, difficulty: 'beginner', focusArea: 'recovery' },
];
exports.sampleLeaderboardEntries = [
    { userId: 'maya@example.com', name: 'Maya Chen', score: 980, rank: 1 },
    { userId: 'luis@example.com', name: 'Luis Rivera', score: 910, rank: 2 },
];
