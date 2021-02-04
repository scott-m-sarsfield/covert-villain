const find = require('lodash/find');
const get = require('lodash/get');
const pick = require('lodash/pick');
const compact = require('lodash/compact');
const map = require('lodash/map');
const filter = require('lodash/filter');
const { roles, parties, phases } = require('./constants');

function canSeeRole(currentPlayer, player, playerCount, phase) {
  if (phase === phases.LOBBY) {
    return !currentPlayer.lobby;
  }
  if (currentPlayer.uuid === player.uuid) {
    return true;
  }
  if (currentPlayer.party === parties.RED) {
    if (currentPlayer.role !== roles.VILLAIN) {
      return true;
    } else if (playerCount <= 6) {
      return true;
    }
  }

  return false;
}

function canSeeParty(currentPlayer, player, playerCount, phase) {
  if (currentPlayer.lobby) {
    return false;
  }
  return canSeeRole(currentPlayer, player, playerCount, phase) || player.investigatedBy === currentPlayer.uuid;
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

function canPeek(currentPlayer, game) {
  const { phase, president } = game;

  if (phase === phases.SPECIAL_ACTION_POLICY_PEEK && currentPlayer.uuid === president) {
    return true;
  }

  return false;
}

function serializePlayers(players, phase, currentPlayer) {
  if (phase === phases.LOBBY && currentPlayer.lobby) {
    players = filter(players, (player) => player.lobby && !player.left);
  } else {
    players = filter(players, (player) => player.playing);
  }

  return map(players, (player) => pick(
    player,
    compact([
      'name',
      'uuid',
      'alive',
      'lobby',
      canSeeParty(currentPlayer, player, players.length, phase) && 'party',
      canSeeRole(currentPlayer, player, players.length, phase) && 'role'
    ])
  ));
}

/* eslint-disable-next-line no-unused-vars */
function serializeGame(game, { uuid }) {
  const { code, data } = game;

  const currentPlayer = find(get(data, 'players'), { uuid });

  if (!currentPlayer) {
    return {};
  }

  return {
    code,
    ...{
      ...data,
      cards: pick(
        data.cards,
        compact([
          'fascist',
          'liberal',
          canSeeHand(currentPlayer, data) && 'hand',
          canPeek(currentPlayer, data) && 'peek'
        ])
      ),
      players: serializePlayers(data.players, data.phase, currentPlayer),
      notifications: currentPlayer.lobby ? [] : data.notifications
    }
  };
}

module.exports = serializeGame;
