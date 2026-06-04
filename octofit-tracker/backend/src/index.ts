import express from 'express';
import mongoose from 'mongoose';

const app = express();
const PORT: number = process.env.PORT ? Number(process.env.PORT) : 8000;
const MONGO_URI: string = process.env.MONGO_URI || 'mongodb://localhost:27017/octofit';

app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

const start = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
  } catch (err) {
    console.error('MongoDB connection error', err);
    process.exit(1);
  }
};

start();
