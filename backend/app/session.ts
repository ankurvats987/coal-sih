import session from 'express-session';
import MongoStore from 'connect-mongo';
import mongoose from './db';

export const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET || 'supersecret',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    client: mongoose.connection.getClient(),
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 1 day
  },
});
