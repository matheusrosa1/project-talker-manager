// Função para verificar se a data assistida do talker atende ao critério de data
function matchesWatchedDate(talker, watchedDate) {
  return !watchedDate || talker.talk.watchedAt === watchedDate;
}

module.exports = matchesWatchedDate;