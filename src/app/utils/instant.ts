import * as moment from 'moment';

export class Instant {
  getISODateFromTimestamp(timestamp: number) {
    return moment(new Date(timestamp)).toISOString();
  }

  getISODateFromTimestampWithDelay(timestamp: number, delay: number) {
    return moment(new Date(timestamp)).add(delay, 'years').toISOString();
  }
}
