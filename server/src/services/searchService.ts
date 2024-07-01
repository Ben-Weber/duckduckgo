import { SearchResult, DuckDuckGoResponse } from '../types/types';

export async function searchDuckDuckGo(query: string): Promise<SearchResult[]> {
  const response: Response = await fetch(
    `http://api.duckduckgo.com/?q=${query}&format=json`
  );
  const data: DuckDuckGoResponse = await response.json();
  return data.RelatedTopics.reduce((acc: SearchResult[], item) => {
    if (item.FirstURL && item.Text) {
      acc.push({ url: item.FirstURL, title: item.Text });
    }
    return acc;
  }, []);
}
