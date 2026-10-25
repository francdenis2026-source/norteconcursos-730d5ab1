import test from 'node:test';
import assert from 'node:assert/strict';
import { acreDate, acreDateKey, acreHour, acreDaysAgoKey } from '../src/lib/acreTime.ts';
import { synchronizeClock, platformNow } from '../src/lib/platformClock.ts';
test('Acre day and greeting do not follow UTC or the host timezone', () => {
 const midnightUTC = new Date('2026-10-14T00:30:00Z');
 assert.equal(acreDateKey(midnightUTC),'2026-10-13');
 assert.equal(acreHour(midnightUTC),19);
 assert.equal(acreDateKey(new Date('2026-10-14T05:00:00Z')),'2026-10-14');
 assert.equal(acreDaysAgoKey(1,new Date('2026-10-14T00:30:00Z')),'2026-10-12');
});
test('civil dates and naive times retain their intended Acre date', () => {
 assert.equal(acreDateKey(acreDate('2026-11-08')),'2026-11-08');
 assert.equal(acreDate('2026-11-08T19:00:00').toISOString(),'2026-11-09T00:00:00.000Z');
});
test('server synchronized clock advances by monotonic time and rejects invalid calibration', () => {
 synchronizeClock(100000,200,5000);
 assert.equal(platformNow(8000),103100);
 synchronizeClock(NaN,0,8000);
 assert.equal(platformNow(9000),104100);
});
