export const downloadCsv = (
  filename: string,
  headers: readonly string[],
  rows: readonly (readonly string[])[],
): void => {
  const escapeCell = (value: string) => `"${value.replace(/"/g, '""')}"`;
  const content = [headers, ...rows]
    .map((row) => row.map((cell) => escapeCell(cell)).join(','))
    .join('\n');

  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
};
