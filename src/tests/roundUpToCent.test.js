const roundUpToCent = require('../utils/helpers');

describe('roundUpToCent', () => {
  it('should return rounded to the smallest currency item to upper bound (ceiled)', () => {
    expect(roundUpToCent(0)).toBe(0);
    expect(roundUpToCent(0.023)).toBe(0.03);
    expect(roundUpToCent(1.233)).toBe(1.24);
    expect(roundUpToCent(1.239)).toBe(1.24);
    expect(roundUpToCent(1.99)).toBe(1.99);
    expect(roundUpToCent(1.091)).toBe(1.1);
  });
});
