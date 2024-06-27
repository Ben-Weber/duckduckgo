import express, { Request, Response } from 'express';
import searchRoutes from './routes/searchRoutes';
import historyRoutes from './routes/historyRoutes';

const app = express();
const port = 8000;

app.use(express.json());

app.use('/api/search', searchRoutes);
app.use('/api/history', historyRoutes);

app.get('*', (req: Request, res: Response) => {
  res.redirect('/api/search');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
