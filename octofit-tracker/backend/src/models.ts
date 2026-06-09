import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, default: 'member' },
    level: { type: String, default: 'starter' },
  },
  { timestamps: true },
);

const teamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    sport: { type: String, required: true },
    captain: { type: String, default: 'TBD' },
    members: { type: [String], default: [] },
  },
  { timestamps: true },
);

const activitySchema = new mongoose.Schema(
  {
    type: { type: String, required: true },
    duration: { type: Number, required: true },
    calories: { type: Number, required: true },
    userName: { type: String, default: 'Unknown' },
  },
  { timestamps: true },
);

const leaderboardSchema = new mongoose.Schema(
  {
    rank: { type: Number, required: true },
    name: { type: String, required: true },
    points: { type: Number, required: true },
    team: { type: String, default: 'Octofit' },
  },
  { timestamps: true },
);

const workoutSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    focus: { type: String, required: true },
    difficulty: { type: String, default: 'beginner' },
    durationMinutes: { type: Number, default: 30 },
  },
  { timestamps: true },
);

export const User = mongoose.model('User', userSchema);
export const Team = mongoose.model('Team', teamSchema);
export const Activity = mongoose.model('Activity', activitySchema);
export const LeaderboardEntry = mongoose.model('LeaderboardEntry', leaderboardSchema);
export const Workout = mongoose.model('Workout', workoutSchema);
