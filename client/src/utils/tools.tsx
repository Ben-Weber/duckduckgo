const escapeRegExp = (string: string) => {
 return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

export const countOccurrences = (text: string, term: string) => {
 if (!term || !text) return 0;
 const escapedTerm = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
 const regex = new RegExp(escapedTerm, 'gi');
 return (text.match(regex) || []).length;
};

export const pluralize = (count: number, singular: string, plural: string) => {
  return count === 1 ? singular : plural;
};

export const highlightTerm = (text: string, term: string) => {
  if (!term || !text) return text;
  const escapedTerm = escapeRegExp(term);
  const parts = text.split(new RegExp(`(${escapedTerm})`, 'gi'));
  return (
    <span>
      {parts.map((part, i) =>
        part.toLowerCase() === term.toLowerCase() ? (
          <span key={i} style={{ backgroundColor: 'yellow' }}>
            {part}
          </span>
        ) : (
          part
        )
      )}
    </span>
  );
};