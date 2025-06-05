export const getDateTimeFromOption = (option: string, baseDate: Date = new Date('2025-06-01T16:40')): string => {
  const date = new Date(baseDate);

  switch (option) {
    case 'now':
      return date.toISOString().slice(0, 16);
    case '1hour':
      date.setHours(date.getHours() + 1);
      return date.toISOString().slice(0, 16);
    case '6hours':
      date.setHours(date.getHours() + 6);
      return date.toISOString().slice(0, 16);
    case '24hours':
      date.setHours(date.getHours() + 24);
      return date.toISOString().slice(0, 16);
    case '7days':
      date.setDate(date.getDate() + 7);
      return date.toISOString().slice(0, 16);
    case '14days':
      date.setDate(date.getDate() + 14);
      return date.toISOString().slice(0, 16);
    case '1month':
      date.setMonth(date.getMonth() + 1);
      return date.toISOString().slice(0, 16);
    default:
      return date.toISOString().slice(0, 16);
  }
};

export const validateDateTime = (startDateTime: string, endDateTime: string): boolean => {
  if (!startDateTime || !endDateTime) return true;
  return new Date(startDateTime) <= new Date(endDateTime);
}; 