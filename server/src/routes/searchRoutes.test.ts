import request from 'supertest';
import express from 'express';
import searchRoutes from './searchRoutes';
import { searchDuckDuckGo } from '../services/searchService';
import { saveQuery } from '../services/queryHistoryService';

jest.mock('../services/searchService');
jest.mock('../services/queryHistoryService');

const app = express();
app.use(express.json());
app.use('/api/search', searchRoutes);

describe('Search Routes', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return search results for a valid query', async () => {
    const mockResults = [{ title: 'Test Result', url: 'http://testurl.com' }];
    (searchDuckDuckGo as jest.Mock).mockResolvedValue(mockResults);

    const response = await request(app).get('/api/search?q=test');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockResults);
    expect(searchDuckDuckGo).toHaveBeenCalledWith('test');
    expect(saveQuery).toHaveBeenCalledWith('test');
  });

  it('should return 400 for missing query parameter', async () => {
    const response = await request(app).get('/api/search');
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'Query parameter is required' });
  });

  it('should handle errors from searchDuckDuckGo', async () => {
    (searchDuckDuckGo as jest.Mock).mockRejectedValue(new Error('API is down'));

    const response = await request(app).get('/api/search?q=test');
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Failed to fetch data from DuckDuckGo' });
  });

  it('should handle errors from saveQuery', async () => {
    const mockResults = [{ title: 'Test Result', url: 'http://testurl.com' }];
    (searchDuckDuckGo as jest.Mock).mockResolvedValue(mockResults);
    (saveQuery as jest.Mock).mockRejectedValue(new Error('Failed to save query'));

    const response = await request(app).get('/api/search?q=test');
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Failed to fetch data from DuckDuckGo' });
  });
});