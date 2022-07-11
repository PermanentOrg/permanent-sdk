export const formatTimestampAsUtc = (dateString: string): string => (
  dateString.endsWith('Z')
    ? dateString
    : `${dateString}Z`
);
