import fs from 'fs';
import path from 'path';

const historyFilePath = path.join(__dirname, 'queryHistory.json');

export const saveQuery = async (query: string) => {
  const queries = await loadQueries();
  queries.push(query);
  return new Promise<void>((resolve, reject) => {
    fs.writeFile(historyFilePath, JSON.stringify(queries, null, 2), (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
};

export const loadQueries = (): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    fs.readFile(historyFilePath, 'utf8', (err, data) => {
      if (err) {
        if (err.code === 'ENOENT') resolve([]); // File not found, return empty array
        else reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
};