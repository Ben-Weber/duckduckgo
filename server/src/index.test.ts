import request from 'supertest';
import express from 'express';
import searchRoutes from './routes/searchRoutes';
import historyRoutes from './routes/historyRoutes';

const app = express();
app.use(express.json());
app.use('/api/search', searchRoutes);
app.use('/api/history', historyRoutes);
app.get('*', (req, res) => {
  res.redirect('/api/search');
});

describe('Server Routes', () => {
  it('should redirect to /api/search for unknown routes', async () => {
    const response = await request(app).get('/unknown-route');
    expect(response.status).toBe(302);
    expect(response.header.location).toBe('/api/search');
  });

  it('should return search results for a valid query', async () => {
    const response = await request(app).get('/api/search?q=test');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('should return 400 for missing query parameter', async () => {
    const response = await request(app).get('/api/search');
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'Query parameter is required' });
  });

  it('should return past queries', async () => {
    const response = await request(app).post('/api/history');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('should handle errors in search route', async () => {
    jest
      .spyOn(global, 'fetch')
      .mockImplementation(() => Promise.reject('API is down'));
    const response = await request(app).get('/api/search?q=test');
    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      error: 'Failed to fetch data from DuckDuckGo',
    });
    (global.fetch as jest.Mock).mockRestore();
  });
});
