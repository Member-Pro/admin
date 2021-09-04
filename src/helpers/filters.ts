import { DateTime } from 'luxon';

export function relativeTime(value: any): string | null {
  const dt = DateTime.fromISO(value);
  return dt.toRelativeCalendar();
}

export function timestamp(value: any): string | null {
  const dt = DateTime.fromISO(value);
  return dt.toFormat('yyyy-MM-dd t');
}
