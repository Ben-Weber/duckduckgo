import fs from 'fs/promises';
import path from 'path';

const historyFilePath = path.join(__dirname, 'queryHistory.json');

export const saveQuery = async (query: string) => {
  const queries = await loadQueries();
  queries.unshift(query);
  await fs.writeFile(historyFilePath, JSON.stringify(queries, null, 2));
};

export const loadQueries = async (): Promise<string[]> => {
  try {
    const data = await fs.readFile(historyFilePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading file:', err);
    if ((err as NodeJS.ErrnoException).code === 'ENOENT') return []; // File not found, return empty array
    throw err;
  }
};
