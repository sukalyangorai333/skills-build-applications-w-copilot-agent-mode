"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mongoose_1 = __importDefault(require("mongoose"));
const models_1 = require("./models");
const router = (0, express_1.Router)();
const isDbConnected = () => mongoose_1.default.connection.readyState === 1;
router.get('/api/users', async (_req, res) => {
    try {
        if (!isDbConnected())
            return res.json(models_1.sampleUsers);
        const users = await models_1.User.find({});
        if (users.length === 0) {
            const created = await models_1.User.insertMany(models_1.sampleUsers);
            return res.json(created);
        }
        return res.json(users);
    }
    catch (error) {
        return res.json(models_1.sampleUsers);
    }
});
router.get('/api/teams', async (_req, res) => {
    try {
        if (!isDbConnected())
            return res.json(models_1.sampleTeams);
        const teams = await models_1.Team.find({});
        if (teams.length === 0) {
            const created = await models_1.Team.insertMany(models_1.sampleTeams);
            return res.json(created);
        }
        return res.json(teams);
    }
    catch (error) {
        return res.json(models_1.sampleTeams);
    }
});
router.get('/api/activities', async (_req, res) => {
    try {
        if (!isDbConnected())
            return res.json(models_1.sampleActivities);
        const activities = await models_1.Activity.find({});
        if (activities.length === 0) {
            const created = await models_1.Activity.insertMany(models_1.sampleActivities);
            return res.json(created);
        }
        return res.json(activities);
    }
    catch (error) {
        return res.json(models_1.sampleActivities);
    }
});
router.get('/api/leaderboard', async (_req, res) => {
    try {
        if (!isDbConnected())
            return res.json(models_1.sampleLeaderboardEntries);
        const entries = await models_1.LeaderboardEntry.find({});
        if (entries.length === 0) {
            const created = await models_1.LeaderboardEntry.insertMany(models_1.sampleLeaderboardEntries);
            return res.json(created);
        }
        return res.json(entries);
    }
    catch (error) {
        return res.json(models_1.sampleLeaderboardEntries);
    }
});
router.get('/api/workouts', async (_req, res) => {
    try {
        if (!isDbConnected())
            return res.json(models_1.sampleWorkouts);
        const workouts = await models_1.Workout.find({});
        if (workouts.length === 0) {
            const created = await models_1.Workout.insertMany(models_1.sampleWorkouts);
            return res.json(created);
        }
        return res.json(workouts);
    }
    catch (error) {
        return res.json(models_1.sampleWorkouts);
    }
});
exports.default = router;
