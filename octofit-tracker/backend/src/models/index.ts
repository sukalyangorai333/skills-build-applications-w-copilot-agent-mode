import mongoose, { Schema, Document } from 'mongoose';

export interface UserDoc extends Document {
  name: string;
  email: string;
  fitnessLevel: string;
  teamId?: string;
}

export interface TeamDoc extends Document {
  name: string;
  goal: string;
  members: string[];
}

export interface ActivityDoc extends Document {
  userId: string;
  type: string;
  duration: number;
  distance?: number;
  calories?: number;
}

export interface WorkoutDoc extends Document {
  name: string;
  duration: number;
  difficulty: string;
  focusArea: string;
}

export interface LeaderboardEntryDoc extends Document {
  userId: string;
  name: string;
  score: number;
  rank: number;
}

const userSchema = new Schema<UserDoc>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  fitnessLevel: { type: String, default: 'beginner' },
  teamId: { type: String, default: '' },
}, { timestamps: true });

const teamSchema = new Schema<TeamDoc>({
  name: { type: String, required: true },
  goal: { type: String, required: true },
  members: { type: [String], default: [] },
}, { timestamps: true });

const activitySchema = new Schema<ActivityDoc>({
  userId: { type: String, required: true },
  type: { type: String, required: true },
  duration: { type: Number, required: true },
  distance: { type: Number, default: 0 },
  calories: { type: Number, default: 0 },
}, { timestamps: true });

const workoutSchema = new Schema<WorkoutDoc>({
  name: { type: String, required: true },
  duration: { type: Number, required: true },
  difficulty: { type: String, default: 'moderate' },
  focusArea: { type: String, default: 'full-body' },
}, { timestamps: true });

const leaderboardEntrySchema = new Schema<LeaderboardEntryDoc>({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  score: { type: Number, required: true },
  rank: { type: Number, required: true },
}, { timestamps: true });

export const User = mongoose.model<UserDoc>('User', userSchema);
export const Team = mongoose.model<TeamDoc>('Team', teamSchema);
export const Activity = mongoose.model<ActivityDoc>('Activity', activitySchema);
export const Workout = mongoose.model<WorkoutDoc>('Workout', workoutSchema);
export const LeaderboardEntry = mongoose.model<LeaderboardEntryDoc>('LeaderboardEntry', leaderboardEntrySchema);

export const sampleUsers = [
  { name: 'Maya Chen', email: 'maya@example.com', fitnessLevel: 'advanced' },
  { name: 'Luis Rivera', email: 'luis@example.com', fitnessLevel: 'intermediate' },
];

export const sampleTeams = [
  { name: 'North Star', goal: 'Complete 100 km this month', members: ['maya@example.com', 'luis@example.com'] },
];

export const sampleActivities = [
  { userId: 'maya@example.com', type: 'run', duration: 35, distance: 5.2, calories: 320 },
  { userId: 'luis@example.com', type: 'strength', duration: 45, calories: 280 },
];

export const sampleWorkouts = [
  { name: 'HIIT Circuit', duration: 25, difficulty: 'advanced', focusArea: 'cardio' },
  { name: 'Mobility Flow', duration: 20, difficulty: 'beginner', focusArea: 'recovery' },
];

export const sampleLeaderboardEntries = [
  { userId: 'maya@example.com', name: 'Maya Chen', score: 980, rank: 1 },
  { userId: 'luis@example.com', name: 'Luis Rivera', score: 910, rank: 2 },
];
