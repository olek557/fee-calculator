/**
 * Rounds up a number to the nearest cent.
 *
 * @param {number} price - The number to round up.
 * @returns {number} The rounded up number.
 */
function roundUpToCent(price) {
  return Math.ceil(price * 100) / 100;
}

/**
 * Calculates the week number of a given date.
 *
 * @param {Date} date - The date for which to calculate the week number.
 * @returns {string} The year and week number in the format "YYYY-WW".
 */
function getNumberOfWeek(date) {
  const newDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  // Set to nearest Thursday: current date + 4 - current day number
  // Make Sunday's day number 7
  newDate.setUTCDate(newDate.getUTCDate() + 4 - (newDate.getUTCDay() || 7));
  // Get first day of year
  const yearStart = new Date(Date.UTC(newDate.getUTCFullYear(), 0, 1));
  // Calculate full weeks to nearest Thursday
  const weekNo = Math.ceil(((newDate - yearStart) / 86400000 + 1) / 7);
  return `${newDate.getFullYear()}-${weekNo}`;
}

module.exports = { roundUpToCent, getNumberOfWeek };
