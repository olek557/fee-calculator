const { TRANSACTION_TYPES, USER_TYPES, MESSAGES } = require('../config/config');
const { roundUpToCent } = require('../utils/helpers');
const { fetchFeeData } = require('../services/apiService');
const validateTransaction = require('../utils/validator');

async function calculateCashInFee(amount) {
  const cashInFeeData = await fetchFeeData(TRANSACTION_TYPES.CASH_IN);
  const transactionFee = roundUpToCent((amount * cashInFeeData.percents) / 100);
  return transactionFee > cashInFeeData.max.amount ? cashInFeeData.max.amount : transactionFee;
}

async function calculateCashOutFee(amount, userType, weekTotalAmount) {
  const cashOutFeeData = await fetchFeeData(TRANSACTION_TYPES.CASH_OUT, userType);
  if (userType === USER_TYPES.NATURAL) {
    const weekLimitAmount = cashOutFeeData.week_limit.amount;
    let transactionFee = 0;
    if (weekTotalAmount + amount > weekLimitAmount) {
      transactionFee =
        amount > weekLimitAmount
          ? ((amount - weekLimitAmount) * cashOutFeeData.percents) / 100
          : (amount * cashOutFeeData.percents) / 100;
    }
    return transactionFee;
  }
  if (userType === USER_TYPES.JURIDICAL) {
    const transactionFee = roundUpToCent((amount * cashOutFeeData.percents) / 100);
    return transactionFee > cashOutFeeData.min.amount ? transactionFee : cashOutFeeData.min.amount;
  }
  return 0;
}

/**
 * Calculates the fee for a transaction based on the amount, transaction type, user type, and week total amount.
 *
 * @param {number} amount - The amount of the transaction.
 * @param {string} transactionType - The type of the transaction (e.g., "CASH_IN", "CASH_OUT").
 * @param {string} userType - The type of the user (e.g., "PERSONAL", "BUSINESS").
 * @param {number} [weekTotalAmount=0] - The total amount of transactions for the week (optional, defaults to 0).
 * @returns {number} The calculated fee for the transaction.
 * @throws {Error} If the transaction type is not supported.
 */
function calculateFee(amount, transactionType, userType, weekTotalAmount = 0) {
  validateTransaction(amount, transactionType, userType);
  switch (transactionType) {
    case TRANSACTION_TYPES.CASH_IN:
      return calculateCashInFee(amount);
    case TRANSACTION_TYPES.CASH_OUT:
      return calculateCashOutFee(amount, userType, weekTotalAmount);
    default:
      throw new Error(MESSAGES.UNSUPPORTED_TYPE);
  }
}

module.exports = calculateFee;
