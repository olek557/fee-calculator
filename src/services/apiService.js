const axios = require('axios');
const { TRANSACTION_TYPES, USER_TYPES, URLS, MESSAGES } = require('../config/config');

function getFeeConfigurationUrl(operationType, userType) {
  let url = '';
  if (operationType === TRANSACTION_TYPES.CASH_IN) {
    url = URLS.CASHIN_URL;
  } else if (operationType === TRANSACTION_TYPES.CASH_OUT) {
    url = userType === USER_TYPES.NATURAL ? URLS.CASHOUT_NATURAL_URL : URLS.CASHOUT_JURIDICAL_URL;
  }

  return `${URLS.BASE_URL}/${url}`;
}

async function fetchFeeData(operationType, userType) {
  const url = getFeeConfigurationUrl(operationType, userType);
  try {
    const response = await axios.get(url);
    if (response.status !== 200 || !response.data) {
      throw new Error(`${MESSAGES.API_FETCH_FAILED}: ${response.status}`);
    }
    return response.data;
  } catch (error) {
    console.error(error.message);
    return null;
  }
}

module.exports = { fetchFeeData };
