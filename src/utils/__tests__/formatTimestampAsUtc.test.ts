import { formatTimestampAsUtc } from '..';

describe('formatTimestampAsUtc', () => {
  it('should not modify a UTC timestamp', () => {
    const timestamp = '2022-07-10T14:59:03.853Z';
    expect(formatTimestampAsUtc(timestamp)).toEqual(timestamp);
  });
  it('should add Z to a non-UTC timestamp', () => {
    const timestamp = '2022-07-10T14:59:03.853';
    expect(formatTimestampAsUtc(timestamp)).toEqual(`${timestamp}Z`);
  });
});
