const fs = require('fs').promises;

async function readFile(filePath) {
  try {
    const data = await fs.readFile(filePath);
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading file at ${filePath}:`, error.message);
    throw error;
  }
}

module.exports = readFile;
