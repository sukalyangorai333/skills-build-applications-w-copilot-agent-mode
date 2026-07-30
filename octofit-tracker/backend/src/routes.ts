import { Router } from 'express';
import mongoose from 'mongoose';
import {
  Activity,
  LeaderboardEntry,
  Team,
  User,
  Workout,
  sampleActivities,
  sampleLeaderboardEntries,
  sampleTeams,
  sampleUsers,
  sampleWorkouts,
} from './models';

const router = Router();

const isDbConnected = () => mongoose.connection.readyState === 1;

router.get('/api/users', async (_req, res) => {
  try {
    if (!isDbConnected()) return res.json(sampleUsers);

    const users = await User.find({});
    if (users.length === 0) {
      const created = await User.insertMany(sampleUsers);
      return res.json(created);
    }
    return res.json(users);
  } catch (error) {
    return res.json(sampleUsers);
  }
});

router.get('/api/teams', async (_req, res) => {
  try {
    if (!isDbConnected()) return res.json(sampleTeams);

    const teams = await Team.find({});
    if (teams.length === 0) {
      const created = await Team.insertMany(sampleTeams);
      return res.json(created);
    }
    return res.json(teams);
  } catch (error) {
    return res.json(sampleTeams);
  }
});

router.get('/api/activities', async (_req, res) => {
  try {
    if (!isDbConnected()) return res.json(sampleActivities);

    const activities = await Activity.find({});
    if (activities.length === 0) {
      const created = await Activity.insertMany(sampleActivities);
      return res.json(created);
    }
    return res.json(activities);
  } catch (error) {
    return res.json(sampleActivities);
  }
});

router.get('/api/leaderboard', async (_req, res) => {
  try {
    if (!isDbConnected()) return res.json(sampleLeaderboardEntries);

    const entries = await LeaderboardEntry.find({});
    if (entries.length === 0) {
      const created = await LeaderboardEntry.insertMany(sampleLeaderboardEntries);
      return res.json(created);
    }
    return res.json(entries);
  } catch (error) {
    return res.json(sampleLeaderboardEntries);
  }
});

router.get('/api/workouts', async (_req, res) => {
  try {
    if (!isDbConnected()) return res.json(sampleWorkouts);

    const workouts = await Workout.find({});
    if (workouts.length === 0) {
      const created = await Workout.insertMany(sampleWorkouts);
      return res.json(created);
    }
    return res.json(workouts);
  } catch (error) {
    return res.json(sampleWorkouts);
  }
});

export default router;
