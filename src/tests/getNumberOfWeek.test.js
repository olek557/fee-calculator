const { getNumberOfWeek } = require('../utils/helpers');

describe('getNumberOfWeek', () => {
  it('should return 2015-53 for January 1st 2016', () => {
    const date = new Date('2016-01-01');
    expect(getNumberOfWeek(date)).toBe('2015-53');
  });

  it('should return 2015-53 for January 3th 2016', () => {
    const date = new Date('2016-01-03');
    expect(getNumberOfWeek(date)).toBe('2015-53');
  });

  it('should return 2016-2 for January 4th 2016', () => {
    const date = new Date('2016-01-04');
    expect(getNumberOfWeek(date)).toBe('2016-1');
  });

  it('should return 2016-53 for December 31st 2016', () => {
    const date = new Date('2016-12-31');
    expect(getNumberOfWeek(date)).toBe('2016-52');
  });
});
