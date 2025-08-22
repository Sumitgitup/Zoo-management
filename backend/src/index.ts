
import ServerConfig from './config/server-config';

import express, {type Express, type Request, type Response} from 'express';
import connectDB from './config/db-config';
import animalRoutes from './routes/v1/animal-route';
import staffRoutes from './routes/v1/staff-route'

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to the database
connectDB();


app.get('/v1/api/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'API is running!' });
});

app.use('/v1/api/animals', animalRoutes);
app.use('/v1/api/staff', staffRoutes)

app.listen(ServerConfig.PORT, async () => {
  console.log(`✅ Server is running on http://localhost:${ServerConfig.PORT}`);
});