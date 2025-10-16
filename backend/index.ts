import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './app/db';
import { sessionMiddleware } from './app/session';
import authRoutes from './app/routes/auth.routes';
import proposalRoutes from './app/routes/proposal.routes';
import proposalEvaluationRoutes from './app/routes/proposal-evaluation.routes';

dotenv.config();

const startServer = async () => {
  await connectDB();

  const app = express();
  const port: string = process.env.PORT || '3000';

  app.use(express.json());
  app.use(sessionMiddleware);

  app.use('/api/auth', authRoutes);
  app.use('/api/proposals', proposalRoutes);
  app.use('/api/evaluations', proposalEvaluationRoutes);

  app.listen(port, () => console.log(`Server running on ${port}`));
};

startServer();
