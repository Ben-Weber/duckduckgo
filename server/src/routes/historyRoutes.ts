import { Router, Request, Response } from 'express';
import { loadQueries, clearQueries } from '../services/queryHistoryService';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  try {
    const queries = await loadQueries();
    res.status(200).json(queries);
  } catch (error) {
    console.error('Error in history route handler:', error);
    res.status(500).json({ error: 'Failed to load query history' });
  }
});

router.delete('/clear', async (req: Request, res: Response) => {
  try {
    await clearQueries();
    res.status(200).json({ message: 'Query history cleared successfully' });
  } catch (error) {
    console.error('Error clearing query history:', error);
    res.status(500).json({ error: 'Failed to clear query history' });
  }
});

export default router;