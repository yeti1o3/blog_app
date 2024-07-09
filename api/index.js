import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import 'dotenv/config';

// Import routes
import authRoutes from './routes/auth.js';
import profileRoutes from './routes/profile.js';
import createpostRoutes from './routes/createpost.js';

const app = express();
const port = process.env.PORT || 4000;

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

connectDB();

app.use(cookieParser());
app.use(bodyParser.json());

// Use routes
app.use('/', authRoutes);
app.use('/', profileRoutes);
app.use('/',createpostRoutes)

app.listen(port, () => {
  console.log('server is running on port', port);
});


