import { searchDuckDuckGo } from './searchService';
import { SearchResult, DuckDuckGoResponse } from '../types/types';

global.fetch = jest.fn();

describe('searchDuckDuckGo', () => {
  it('should return search results from DuckDuckGo API', async () => {
    const mockResponse: DuckDuckGoResponse = {
      RelatedTopics: [
        { FirstURL: 'http://testurl.com', Text: 'Text' },
        { FirstURL: 'http://testurl2.com', Text: 'Text 2' },
      ],
    };

    (fetch as jest.Mock).mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockResponse),
    });

    const query = 'test';
    const results: SearchResult[] = await searchDuckDuckGo(query);

    expect(results).toEqual([
      { url: 'http://testurl.com', title: 'Text' },
      { url: 'http://testurl2.com', title: 'Text 2' },
    ]);
  });

  it('should handle empty search results', async () => {
    const mockResponse: DuckDuckGoResponse = {
      RelatedTopics: [],
    };

    (fetch as jest.Mock).mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockResponse),
    });

    const query = 'test';
    const results: SearchResult[] = await searchDuckDuckGo(query);

    expect(results).toEqual([]);
  });

  it('should handle missing FirstURL or Text in search results', async () => {
    const mockResponse: DuckDuckGoResponse = {
      RelatedTopics: [
        { FirstURL: 'http://testurl.com', Text: 'Text' },
        { FirstURL: '', Text: 'Text 2' },
        { FirstURL: 'http://testurl3.com', Text: '' },
      ],
    };

    (fetch as jest.Mock).mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockResponse),
    });

    const query = 'test';
    const results: SearchResult[] = await searchDuckDuckGo(query);

    expect(results).toEqual([{ url: 'http://testurl.com', title: 'Text' }]);
  });
});
