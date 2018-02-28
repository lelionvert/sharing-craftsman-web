import { Instant } from './instant';

describe('utils/instant', () => {
  it('should return date with ISO format from timestamp', () => {
    const instant = new Instant();
    expect(instant.getISODateFromTimestamp(1514631600000)).toEqual('2017-12-30T11:00:00.000Z');
  });

  it('should return date with ISO format from now plus delay', () => {
    const instant = new Instant();
    expect(instant.getISODateFromTimestampWithDelay(1514631600000, 2)).toEqual('2019-12-30T11:00:00.000Z');
  });
});
