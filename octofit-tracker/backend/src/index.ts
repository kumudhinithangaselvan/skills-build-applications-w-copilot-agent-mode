import express from 'express';
import mongoose from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from './models';

const app = express();
const PORT = Number(process.env.PORT ?? 8000);
const MONGO_URI = process.env.MONGO_URI ?? 'mongodb://127.0.0.1:27017/octofit_db';
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${PORT}`;

app.use(express.json());

const sampleData = {
  users: [
    { id: 1, name: 'Ava', email: 'ava@example.com', role: 'student' },
    { id: 2, name: 'Liam', email: 'liam@example.com', role: 'coach' },
  ],
  teams: [
    { id: 1, name: 'Trail Blazers', sport: 'Running' },
    { id: 2, name: 'Power Squad', sport: 'Strength' },
  ],
  activities: [
    { id: 1, type: 'Run', duration: 30, calories: 220 },
    { id: 2, type: 'Yoga', duration: 25, calories: 110 },
  ],
  leaderboard: [
    { rank: 1, name: 'Ava', points: 420 },
    { rank: 2, name: 'Liam', points: 390 },
  ],
  workouts: [
    { id: 1, title: 'Morning Sprint', focus: 'Cardio' },
    { id: 2, title: 'Core Strength', focus: 'Stability' },
  ],
};

const fetchCollection = async (model: mongoose.Model<any>, fallback: unknown[]) => {
  try {
    const docs = await model.find({}).lean();
    return docs.length ? docs : fallback;
  } catch (error) {
    console.warn('Falling back to sample data:', error);
    return fallback;
  }
};

const createCollectionHandler = (model: mongoose.Model<any>, collectionName: keyof typeof sampleData) => {
  return async (req: express.Request, res: express.Response) => {
    try {
      const created = await model.create(req.body);
      res.status(201).json({ collection: collectionName, item: created });
    } catch (error) {
      res.status(400).json({ error: 'Unable to create collection item', details: error });
    }
  };
};

app.get('/', (_req, res) => {
  res.json({
    message: 'Octofit Tracker API is running',
    apiBaseUrl,
    endpoints: ['/api/users', '/api/teams', '/api/activities', '/api/leaderboard', '/api/workouts'],
  });
});

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', apiBaseUrl });
});

app.get('/api/users', async (_req, res) => {
  res.json(await fetchCollection(User, sampleData.users));
});
app.post('/api/users', createCollectionHandler(User, 'users'));

app.get('/api/teams', async (_req, res) => {
  res.json(await fetchCollection(Team, sampleData.teams));
});
app.post('/api/teams', createCollectionHandler(Team, 'teams'));

app.get('/api/activities', async (_req, res) => {
  res.json(await fetchCollection(Activity, sampleData.activities));
});
app.post('/api/activities', createCollectionHandler(Activity, 'activities'));

app.get('/api/leaderboard', async (_req, res) => {
  res.json(await fetchCollection(LeaderboardEntry, sampleData.leaderboard));
});
app.post('/api/leaderboard', createCollectionHandler(LeaderboardEntry, 'leaderboard'));

app.get('/api/workouts', async (_req, res) => {
  res.json(await fetchCollection(Workout, sampleData.workouts));
});
app.post('/api/workouts', createCollectionHandler(Workout, 'workouts'));

const start = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log(`Connected to MongoDB at ${MONGO_URI}`);
  } catch (error) {
    console.warn('MongoDB connection skipped or unavailable:', error);
  }

  app.listen(PORT, () => {
    console.log(`Server listening on ${apiBaseUrl}`);
  });
};

start();
