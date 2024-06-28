import { SearchResult, DuckDuckGoResponse } from '../types/types';

export async function searchDuckDuckGo(query: string): Promise<SearchResult[]> {
  const response = await fetch(
    `http://api.duckduckgo.com/?q=${query}&format=json`
  );
  const data = (await response.json()) as DuckDuckGoResponse;
  return data.RelatedTopics.reduce((acc, item) => {
    if (item.FirstURL && item.Text) {
      acc.push({ url: item.FirstURL, title: item.Text });
    }
    return acc;
  }, [] as SearchResult[]);
}
