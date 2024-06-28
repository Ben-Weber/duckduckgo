import request from 'supertest';
import express from 'express';
import historyRoutes from './historyRoutes';
import { loadQueries } from '../services/queryHistoryService';

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
});
