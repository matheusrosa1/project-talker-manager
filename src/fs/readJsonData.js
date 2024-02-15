const fs = require('fs').promises;

const readJsonData = async (_path) => {
  try {
    const content = await fs.readFile(_path, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    console.error(`Erro ao ler o arquivo: ${error.message}`);
  }
};

module.exports = readJsonData;