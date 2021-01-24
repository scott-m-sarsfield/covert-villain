const find = require('lodash/find');
const get = require('lodash/get');
const includes = require('lodash/includes');
const pick = require('lodash/pick');
const compact = require('lodash/compact');
const map = require('lodash/map');
const { roles, parties, phases } = require('./constants');

function canSeeRole(currentPlayer, player, playerCount, phase) {
  if (phase === phases.GAME_OVER) {
    return true;
  }
  if (currentPlayer.uuid === player.uuid) {
    return true;
  }
  if (currentPlayer.party === parties.FASCIST) {
    if (currentPlayer.role !== roles.MUSSOLINI) {
      return true;
    } else if (playerCount <= 6) {
      return true;
    }
  }

  return false;
}

function canSeeParty(currentPlayer, player, playerCount, phase) {
  return canSeeRole(currentPlayer, player, playerCount, phase) || includes(player.investigatedBy, currentPlayer.uuid);
}

function canSeeHand(currentPlayer, game) {
  const { phase, president, chancellor } = game;

  if (phase === phases.PRESIDENT_CHOOSES_POLICIES && currentPlayer.uuid === president) {
    return true;
  }

  if (phase === phases.CHANCELLOR_CHOOSES_POLICY && currentPlayer.uuid === chancellor) {
    return true;
  }

  return false;
}

/* eslint-disable-next-line no-unused-vars */
function serializeGame(game, { uuid }) {
  const { code, data } = game;

  const currentPlayer = find(get(data, 'players'), { uuid });
  return {
    code,
    ...{
      ...data,
      cards: pick(
        data.cards,
        compact([
          'fascist',
          'liberal',
          canSeeHand(currentPlayer, data) && 'hand'
        ])
      ),
      players: map(data.players, (player) => pick(
        player,
        compact([
          'name',
          'uuid',
          canSeeParty(currentPlayer, player, data.players.length, data.phase) && 'party',
          canSeeRole(currentPlayer, player, data.players.length, data.phase) && 'role'
        ])
      ))
    }
  };
}

module.exports = serializeGame;
