import dayjs from 'dayjs';

export type DateRangeFilter =
  | 'all'
  | 'last30'
  | 'last90'
  | 'thisYear'
  | 'lastYear'
  | `year-${number}`;

const DASHBOARD_CONTENT_DATES: Record<string, string> = {
  'svc-wedding': dayjs().subtract(5, 'day').format('YYYY-MM-DD'),
  'svc-parties': dayjs().subtract(20, 'day').format('YYYY-MM-DD'),
  'svc-destination': dayjs().subtract(75, 'day').format('YYYY-MM-DD'),
  'test-1': dayjs().subtract(10, 'day').format('YYYY-MM-DD'),
  'test-2': dayjs().subtract(400, 'day').format('YYYY-MM-DD'),
  'gal-1': dayjs().subtract(25, 'day').format('YYYY-MM-DD'),
  'gal-2': dayjs().subtract(180, 'day').format('YYYY-MM-DD'),
  'gal-3': '2024-03-01',
};

export const getDashboardContentDate = (id: string, fallback: string): string =>
  DASHBOARD_CONTENT_DATES[id] ?? fallback;

export const matchesDashboardDateRange = (
  rowDate: string,
  dateRange: DateRangeFilter,
): boolean => {
  if (dateRange === 'all') {
    return true;
  }

  const date = dayjs(rowDate).startOf('day');
  const today = dayjs().startOf('day');

  if (dateRange === 'last30') {
    return !date.isBefore(today.subtract(30, 'day'));
  }

  if (dateRange === 'last90') {
    return !date.isBefore(today.subtract(90, 'day'));
  }

  if (dateRange === 'thisYear') {
    return date.year() === today.year();
  }

  if (dateRange === 'lastYear') {
    return date.year() === today.year() - 1;
  }

  if (dateRange.startsWith('year-')) {
    const year = Number(dateRange.slice(5));
    return !Number.isNaN(year) && date.year() === year;
  }

  return true;
};

export const getDashboardYearFilters = (rows: ReadonlyArray<{ date: string }>): DateRangeFilter[] =>
  [...new Set(rows.map((row) => dayjs(row.date).year()))]
    .sort((left, right) => right - left)
    .map((year) => `year-${year}` as DateRangeFilter);
