const find = require('lodash/find');
const get = require('lodash/get');
const includes = require('lodash/includes');
const pick = require('lodash/pick');
const compact = require('lodash/compact');
const map = require('lodash/map');
const { roles, parties } = require('./constants');

function canSeeRole(currentPlayer, player, playerCount) {
  if (currentPlayer.party === parties.FASCIST) {
    if (currentPlayer.role !== roles.MUSSOLINI) {
      return true;
    } else if (playerCount <= 6) {
      return true;
    }
  }

  return false;
}

function canSeeParty(currentPlayer, player, playerCount) {
  return canSeeRole(currentPlayer, player, playerCount) || includes(player.investigatedBy, currentPlayer.uuid);
}

/* eslint-disable-next-line no-unused-vars */
function serializeGame(game, { uuid }) {
  const { code, data } = game;

  const currentPlayer = find(get(data, 'players'), { uuid });
  return {
    code,
    ...{
      ...data,
      players: map(data.players, (player) => pick(
        player,
        compact([
          'name',
          'uuid',
          canSeeParty(currentPlayer, player, data.players.length) && 'party',
          canSeeRole(currentPlayer, player, data.players.length) && 'role'
        ])
      ))
    }
  };
}

module.exports = serializeGame;
