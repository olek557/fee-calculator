const { TRANSACTION_TYPES, USER_TYPES, MESSAGES } = require('../config/config');

/**
 * Validates a transaction based on the provided amount, operation type, and user type.
 *
 * @param {number} amount - The amount of the transaction.
 * @param {string} operationType - The type of the operation (e.g., "CASH_IN", "CASH_OUT").
 * @param {string} userType - The type of the user (e.g., "NATURAL", "JURIDICAL").
 * @throws {Error} If the amount is invalid, operation type is unsupported, or user type is invalid.
 */
function validateTransaction(amount, operationType, userType) {
  if (!amount || typeof +amount !== 'number' || amount <= 0) {
    throw new Error(MESSAGES.INVALID_AMOUNT);
  }

  if (
    !operationType ||
    (operationType !== TRANSACTION_TYPES.CASH_IN && operationType !== TRANSACTION_TYPES.CASH_OUT)
  ) {
    throw new Error(MESSAGES.UNSUPPORTED_TYPE);
  }

  if (
    operationType === TRANSACTION_TYPES.CASH_OUT &&
    (!userType || (userType !== USER_TYPES.NATURAL && userType !== USER_TYPES.JURIDICAL))
  ) {
    throw new Error(MESSAGES.INVALID_USER_TYPE);
  }
}

module.exports = validateTransaction;
