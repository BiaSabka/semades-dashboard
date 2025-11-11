import express from 'express';
import dotenv from 'dotenv';
import connectDB from './mongoDb.js';
import publicRoutes from './routes/auth_routes.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use('/usuarios', publicRoutes);

app.get('/', (_req, res) => {
  res.send('Hello, World!');
});

const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to start server due to DB connection error:', err);
  });

