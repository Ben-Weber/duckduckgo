export const escapeRegExp = (string: string) => {
 return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};


export const countOccurrences = (text: string, term: string) => {
 if (!term || !text) return 0;
 const escapedTerm = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
 const regex = new RegExp(escapedTerm, 'gi');
 return (text.match(regex) || []).length;
};