// Função para verificar se a taxa do talker atende ao critério de taxa
function matchesRateValue(talker, rateValue) {
  return !rateValue || talker.talk.rate === rateValue;
}

module.exports = matchesRateValue;