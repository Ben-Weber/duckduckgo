import { Router, Request, Response } from 'express';
import { loadQueries } from '../services/queryHistoryService';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const queries = await loadQueries();
    res.json(queries);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load query history' });
  }
});

export default router;