import express from 'express';
import cors from 'cors';
import connectDB from './config/database';

const app = express();
const PORT = 8000;

const CODESPACE_NAME = process.env.CODESPACE_NAME;
const API_BASE_URL = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.app.github.dev`
  : `http://localhost:${PORT}`;

console.log(`API base URL: ${API_BASE_URL}`);

app.use(cors());
app.use(express.json());

app.get('/api/users', (req, res) => {
  res.json({ message: 'Users endpoint' });
});

app.get('/api/activities', (req, res) => {
  res.json({ message: 'Activities endpoint' });
});

app.get('/api/teams', (req, res) => {
  res.json({ message: 'Teams endpoint' });
});

app.get('/api/leaderboard', (req, res) => {
  res.json({ message: 'Leaderboard endpoint' });
});

app.get('/api/workouts', (req, res) => {
  res.json({ message: 'Workouts endpoint' });
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

export default app;
