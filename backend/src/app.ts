import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import routes from './routes';
import { errorHandler } from './middlewares/errorMiddleware';

dotenv.config();

const app = express();

app.use(
  cors({
    origin: 'http://localhost:5173', // Frontend URL
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  })
);

app.use(bodyParser.json());

// Register routes
app.use('/', routes);

// Error handling middleware
app.use(errorHandler);

export default app;