const calculateFee = require('../controllers/feeCalculator');
const { MESSAGES, TRANSACTION_TYPES, USER_TYPES } = require('../config/config');

describe('calculateFee', () => {
  it('should throw an error if the input empty', () => {
    expect(async () => calculateFee()).rejects.toThrow(MESSAGES.INVALID_AMOUNT);
  });
  it('should throw an error if amount = 0', () => {
    expect(async () => calculateFee(0)).rejects.toThrow(MESSAGES.INVALID_AMOUNT);
  });
  it('should throw an error if amount <= 0', () => {
    expect(async () => calculateFee(-3)).rejects.toThrow(MESSAGES.INVALID_AMOUNT);
  });
  it('should throw an error if no second argument', () => {
    expect(async () => calculateFee(1)).rejects.toThrow(MESSAGES.UNSUPPORTED_TYPE);
  });
  it('should throw an eror when wrong operation type', () => {
    expect(async () => calculateFee(1, 'test')).rejects.toThrow(MESSAGES.UNSUPPORTED_TYPE);
  });
  it('should throw an error when no user type for cashout operations', () => {
    expect(async () => calculateFee(1, TRANSACTION_TYPES.CASH_OUT)).rejects.toThrow(
      MESSAGES.INVALID_USER_TYPE,
    );
  });
  it('should throw an error when wrong user type for cashout operations', () => {
    expect(async () => calculateFee(1, TRANSACTION_TYPES.CASH_OUT, 'test')).rejects.toThrow(
      MESSAGES.INVALID_USER_TYPE,
    );
  });

  it('should return 0.0003 if the amount input is 1 and operation type is cashin', async () => {
    expect(await calculateFee(1, TRANSACTION_TYPES.CASH_IN)).toBe(0.01);
  });

  it('should return 0.06 if the amount input is 200 and operation type is cashin', async () => {
    expect(await calculateFee(200, TRANSACTION_TYPES.CASH_IN)).toBe(0.06);
  });

  it('should return 5 if the amount input is 16634 and operation type is cashin', async () => {
    expect(await calculateFee(16634, TRANSACTION_TYPES.CASH_IN)).toBe(5);
  });

  it('should return 0 if the amount input is 1 and operation type is cashout and natural user type and weekTotalAmount < 1000', async () => {
    const result = await calculateFee(1, TRANSACTION_TYPES.CASH_OUT, USER_TYPES.NATURAL);
    expect(result).toBe(0);
  });

  it('should return 0.3 if the amount input is 1 and operation type is cashout and natural user type and weekTotalAmount = 1000', async () => {
    const result = await calculateFee(1, TRANSACTION_TYPES.CASH_OUT, USER_TYPES.NATURAL, 1000);
    expect(result).toBe(0.3);
  });

  it('should return 300 if the amount input is 2000 and operation type is cashout and natural user type and weekTotalAmount = 1000', async () => {
    const result = await calculateFee(2000, TRANSACTION_TYPES.CASH_OUT, USER_TYPES.NATURAL, 1000);
    expect(result).toBe(300);
  });

  it('should return 0.50 if the amount input is 1 and operation type is cashout and juridical user type', async () => {
    const result = await calculateFee(1, TRANSACTION_TYPES.CASH_OUT, USER_TYPES.JURIDICAL);
    expect(result).toBe(0.5);
  });
});
