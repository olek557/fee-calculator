const readFile = require('./src/utils/fileReader');
const processTransactions = require('./src/controllers/transactionProcessor');

if (process.argv.length < 3) {
  console.error('Please provide the input file path');
  process.exit(1);
}
const inputFilePath = process.argv[2];

async function init() {
  const transactions = await readFile(inputFilePath);
  processTransactions(transactions);
}

init();
