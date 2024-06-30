import request from 'supertest';
import express from 'express';
import historyRoutes from './historyRoutes';
import { loadQueries, clearQueries } from '../services/queryHistoryService';

jest.mock('../services/queryHistoryService');

const app = express();
app.use(express.json());
app.use('/api/history', historyRoutes);

describe('History Routes', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return past queries', async () => {
    const mockQueries = ['query1', 'query2'];
    (loadQueries as jest.Mock).mockResolvedValue(mockQueries);

    const response = await request(app).post('/api/history');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockQueries);
    expect(loadQueries).toHaveBeenCalledTimes(1);
  });

  it('should handle errors from loadQueries', async () => {
    (loadQueries as jest.Mock).mockRejectedValue(
      new Error('Failed to load query history')
    );

    const response = await request(app).post('/api/history');
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Failed to load query history' });
  });

  it('should clear query history', async () => {
    (clearQueries as jest.Mock).mockResolvedValue(undefined);

    const response = await request(app).delete('/api/history/clear');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Query history cleared successfully' });
    expect(clearQueries).toHaveBeenCalledTimes(1);
  });

  it('should handle errors from clearQueries', async () => {
    (clearQueries as jest.Mock).mockRejectedValue(
      new Error('Failed to clear query history')
    );

    const response = await request(app).delete('/api/history/clear');
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Failed to clear query history' });
  });
});