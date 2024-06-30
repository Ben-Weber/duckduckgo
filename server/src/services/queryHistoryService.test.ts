import { saveQuery, loadQueries, clearQueries } from './queryHistoryService';
import fs from 'fs/promises';

jest.mock('fs/promises');

jest.mock('path', () => ({
 ...jest.requireActual('path'),
 join: () => 'mock/path/queryHistory.json'
}));

describe('queryHistoryService', () => {
  const mockFilePath = 'mock/path/queryHistory.json';

  beforeEach(() => {
    jest.clearAllMocks();
    jest.mock('./queryHistoryService', () => {
      const originalModule = jest.requireActual('./queryHistoryService');
      return {
        ...originalModule,
        __esModule: true,
        historyFilePath: mockFilePath,
      };
    });
  });

  describe('saveQuery', () => {
    it('should save a new query to the history file', async () => {
      const mockQueries = ['query1', 'query2'];
      (fs.readFile as jest.Mock).mockResolvedValue(JSON.stringify(mockQueries));
      (fs.writeFile as jest.Mock).mockResolvedValue(undefined);

      await saveQuery('newQuery');

      expect(fs.readFile).toHaveBeenCalledWith(mockFilePath, 'utf8');
      expect(fs.writeFile).toHaveBeenCalledWith(
        mockFilePath,
        JSON.stringify(['newQuery', ...mockQueries], null, 2)
      );
    });

    it('should handle errors when saving a query', async () => {
      (fs.readFile as jest.Mock).mockRejectedValue(new Error('Read error'));

      await expect(saveQuery('newQuery')).rejects.toThrow('Read error');
    });
  });

  describe('loadQueries', () => {
    it('should load queries from the history file', async () => {
      const mockQueries = ['query1', 'query2'];
      (fs.readFile as jest.Mock).mockResolvedValue(JSON.stringify(mockQueries));

      const queries = await loadQueries();

      expect(fs.readFile).toHaveBeenCalledWith(mockFilePath, 'utf8');
      expect(queries).toEqual(mockQueries);
    });

    it('should return an empty array if the file does not exist', async () => {
      (fs.readFile as jest.Mock).mockRejectedValue({ code: 'ENOENT' });

      const queries = await loadQueries();

      expect(fs.readFile).toHaveBeenCalledWith(mockFilePath, 'utf8');
      expect(queries).toEqual([]);
    });

    it('should handle errors when loading queries', async () => {
      (fs.readFile as jest.Mock).mockRejectedValue(new Error('Read error'));

      await expect(loadQueries()).rejects.toThrow('Read error');
    });
  });

  describe('clearQueries', () => {
    it('should clear the query history', async () => {
      (fs.writeFile as jest.Mock).mockResolvedValue(undefined);

      await clearQueries();

      expect(fs.writeFile).toHaveBeenCalledWith(mockFilePath, JSON.stringify([]));
    });

    it('should handle errors when clearing queries', async () => {
      (fs.writeFile as jest.Mock).mockRejectedValue(new Error('Write error'));

      await expect(clearQueries()).rejects.toThrow('Write error');
    });
  });
});