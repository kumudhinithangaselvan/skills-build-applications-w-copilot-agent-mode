import mongoose from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models';

// Seed the octofit_db database with test data
const MONGO_URI = process.env.MONGO_URI ?? 'mongodb://127.0.0.1:27017/octofit_db';

const seedData = async () => {
  await mongoose.connect(MONGO_URI);
  console.log(`Connected to MongoDB at ${MONGO_URI}`);

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    LeaderboardEntry.deleteMany({}),
    Workout.deleteMany({}),
  ]);

  const users = await User.insertMany([
    { name: 'Ava Patel', email: 'ava.patel@example.com', role: 'captain', level: 'advanced' },
    { name: 'Liam Chen', email: 'liam.chen@example.com', role: 'coach', level: 'intermediate' },
    { name: 'Maya Johnson', email: 'maya.johnson@example.com', role: 'member', level: 'starter' },
  ]);

  const teams = await Team.insertMany([
    { name: 'Trail Blazers', sport: 'Running', captain: 'Ava Patel', members: ['Ava Patel', 'Liam Chen'] },
    { name: 'Power Squad', sport: 'Strength', captain: 'Maya Johnson', members: ['Maya Johnson'] },
  ]);

  const activities = await Activity.insertMany([
    { type: 'Run', duration: 30, calories: 220, userName: 'Ava Patel' },
    { type: 'Yoga', duration: 25, calories: 110, userName: 'Liam Chen' },
    { type: 'Cycling', duration: 45, calories: 310, userName: 'Maya Johnson' },
  ]);

  const leaderboard = await LeaderboardEntry.insertMany([
    { rank: 1, name: 'Ava Patel', points: 420, team: 'Trail Blazers' },
    { rank: 2, name: 'Liam Chen', points: 390, team: 'Power Squad' },
    { rank: 3, name: 'Maya Johnson', points: 365, team: 'Trail Blazers' },
  ]);

  const workouts = await Workout.insertMany([
    { title: 'Morning Sprint', focus: 'Cardio', difficulty: 'intermediate', durationMinutes: 25 },
    { title: 'Core Strength', focus: 'Stability', difficulty: 'beginner', durationMinutes: 30 },
    { title: 'Interval HIIT', focus: 'Endurance', difficulty: 'advanced', durationMinutes: 40 },
  ]);

  console.log('Seed completed:', {
    users: users.length,
    teams: teams.length,
    activities: activities.length,
    leaderboard: leaderboard.length,
    workouts: workouts.length,
  });

  await mongoose.disconnect();
};

seedData().catch((error) => {
  console.error('Seed failed:', error);
  process.exitCode = 1;
});
