import { Router, Request, Response } from 'express';
import { searchDuckDuckGo } from '../services/searchService';
import { saveQuery } from '../services/queryHistoryService';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  const query = req.query.q as string | undefined;
  if (!query) {
    return res.status(400).json({ error: 'Query parameter is required' });
  }

  try {
    const results = await searchDuckDuckGo(query);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data from DuckDuckGo' });
  }
});

router.post('/', async (req: Request, res: Response) => {
  const query = req.query.q as string | undefined;
  console.log('query', query);
  if (!query) {
    return res.status(400).json({ error: 'Query parameter is required' });
  }

  try {
    const results = await searchDuckDuckGo(query);
    console.log('results', results);
    await saveQuery(query);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data from DuckDuckGo' });
  }
});

export default router;