import session from 'express-session';
import MongoStore from 'connect-mongo';
import dotenv from 'dotenv';
import mongoose from './db';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/coal-sih';

export const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET || 'supersecret',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: MONGODB_URI,
    client: mongoose.connection.getClient(),
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 1 day
  },
});
