const { getNumberOfWeek } = require('../utils/helpers');
const calculateFee = require('./feeCalculator');
const { TRANSACTION_TYPES, USER_TYPES } = require('../config/config');

const userCashOutTracker = {};

/**
 * Saves the transaction amount to the weekly total amount for a specific user.
 *
 * @param {object} transaction - The transaction object.
 * @param {string} yearWeek - The year and week identifier.
 */
const saveTransactiontoWeekTotalAmount = (
  { type, operation, user_id: userId, user_type: userType },
  yearWeek,
) => {
  if (type === TRANSACTION_TYPES.CASH_OUT && userType === USER_TYPES.NATURAL) {
    userCashOutTracker[userId] = userCashOutTracker[userId] || {};

    userCashOutTracker[userId][yearWeek] =
      (userCashOutTracker[userId][yearWeek] || 0) + operation.amount;
  }
};

const processTransactions = async (transactions) => {
  const feePromises = transactions.map(async (transaction) => {
    const yearWeek = getNumberOfWeek(new Date(transaction.date));

    const fee = calculateFee(
      transaction.operation.amount,
      transaction.type,
      transaction.user_type,
      userCashOutTracker[transaction.user_id]?.[yearWeek] || 0,
    );

    saveTransactiontoWeekTotalAmount(transaction, yearWeek);

    return fee;
  });

  await Promise.all(feePromises).then((fees) => fees.forEach((fee) => console.log(fee.toFixed(2))));
};

module.exports = processTransactions;
