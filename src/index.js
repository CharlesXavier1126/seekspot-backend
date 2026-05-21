import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { sequelize } from './models/index.js';
import authRoutes from './routes/auth.js';

const app = express();

const corsOptions = {
  origin: [
    'http://localhost:5174',           // Local dev frontend
    'https://sandbox.seekschool.nz'   // Sandbox CDN domain
  ],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

app.use((req, res, next) => {
  const secretHeader = req.headers['x-seekspot-origin'];
  if (secretHeader !== process.env.ORIGIN_SECRET_KEY) {
    return res.status(403).json({ error: 'Access denied' });
  }
  next();
});

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3001;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Seekspot backend running on port ${PORT}`);
  });
});
