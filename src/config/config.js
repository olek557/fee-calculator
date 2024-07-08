module.exports = {
  MESSAGES: {
    NO_TRANSACTIONS: 'No transactions found in the input file.',
    PROCESSING_ERROR: 'An error occurred while processing transactions',
    UNSUPPORTED_CURRENCY: 'Unsupported currency',
    UNSUPPORTED_TYPE: 'Unsupported transaction type',
    INVALID_AMOUNT: 'Invalid transaction amount',
    INVALID_USER_TYPE: 'Invalid user type',
    TRANSACTION_FAILED: 'Failed to process transaction ID',
    API_FETCH_FAILED: 'Failed to fetch fee data for type',
  },
  URLS: {
    BASE_URL: 'https://developers.paysera.com/tasks/api',
    CASHIN_URL: 'cash-in',
    CASHOUT_NATURAL_URL: 'cash-out-natural',
    CASHOUT_JURIDICAL_URL: 'cash-out-juridical',
  },
  SUPPORTED_CURRENCY: 'EUR',
  TRANSACTION_TYPES: {
    CASH_IN: 'cash_in',
    CASH_OUT: 'cash_out',
  },
  USER_TYPES: {
    NATURAL: 'natural',
    JURIDICAL: 'juridical',
  },
};
