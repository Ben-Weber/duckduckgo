export type SearchResult = {
 title: string;
 url: string;
};

export type DuckDuckGoResponse = {
 RelatedTopics: { FirstURL: string; Text: string }[];
};