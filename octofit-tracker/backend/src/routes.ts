import { Router } from 'express';
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

router.get('/api/users', async (_req, res) => {
  try {
    const users = await User.find({});
    if (users.length === 0) {
      const created = await User.insertMany(sampleUsers);
      return res.json(created);
    }
    return res.json(users);
  } catch (error) {
    return res.status(500).json({ error: 'Unable to load users' });
  }
});

router.get('/api/teams', async (_req, res) => {
  try {
    const teams = await Team.find({});
    if (teams.length === 0) {
      const created = await Team.insertMany(sampleTeams);
      return res.json(created);
    }
    return res.json(teams);
  } catch (error) {
    return res.status(500).json({ error: 'Unable to load teams' });
  }
});

router.get('/api/activities', async (_req, res) => {
  try {
    const activities = await Activity.find({});
    if (activities.length === 0) {
      const created = await Activity.insertMany(sampleActivities);
      return res.json(created);
    }
    return res.json(activities);
  } catch (error) {
    return res.status(500).json({ error: 'Unable to load activities' });
  }
});

router.get('/api/leaderboard', async (_req, res) => {
  try {
    const entries = await LeaderboardEntry.find({});
    if (entries.length === 0) {
      const created = await LeaderboardEntry.insertMany(sampleLeaderboardEntries);
      return res.json(created);
    }
    return res.json(entries);
  } catch (error) {
    return res.status(500).json({ error: 'Unable to load leaderboard' });
  }
});

router.get('/api/workouts', async (_req, res) => {
  try {
    const workouts = await Workout.find({});
    if (workouts.length === 0) {
      const created = await Workout.insertMany(sampleWorkouts);
      return res.json(created);
    }
    return res.json(workouts);
  } catch (error) {
    return res.status(500).json({ error: 'Unable to load workouts' });
  }
});

export default router;
