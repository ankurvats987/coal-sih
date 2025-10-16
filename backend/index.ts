import express from 'express';
import { connectDB } from './app/db';
import { sessionMiddleware } from './app/session';
import authRoutes from './app/routes/auth.routes';

const app = express();
const port: string = process.env.PORT || '3000';

connectDB();

app.use(express.json());
app.use(sessionMiddleware);

app.use('/api/auth', authRoutes);

app.listen(port, () => console.log(`Server running on ${port}`));
