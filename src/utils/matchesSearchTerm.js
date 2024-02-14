function matchesSearchTerm(talker, searchTerm) {
  return !searchTerm || talker.name.toLowerCase().includes(searchTerm.toLowerCase());
}

module.exports = matchesSearchTerm;