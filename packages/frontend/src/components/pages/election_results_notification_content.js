import React from 'react';
import types from 'prop-types';
import { useSelector } from 'react-redux';
import Instructions, { Details } from '../shared/instructions';
import { PlayerTable, Vote } from '../shared/player_table';

const ElectionResultsNotificationContent = ({ data }) => { // data prop
  const { data: game } = useSelector((state) => state.game);
  const { votes, success, failed, chaos } = data;

  const players = game.players.map((player) => ({
    ...player,
    role: null,
    vote: votes[player.uuid]
  }));

  return (
    <React.Fragment>
      {success && <Instructions>Election Successful!</Instructions>}
      {failed && <Instructions>Election Failed!</Instructions>}

      <PlayerTable players={players} renderRightContent={({ vote }) => vote && (
        <Vote approved={vote.approved}>{vote.approved ? 'Yes' : 'No'}</Vote>
      )}/>

      {
        failed && (
          chaos ? (
            <Details>Country is in chaos.  Policy will be enacted.</Details>
          ) : (
            <Details>Chaos has increased.</Details>
          )
        )
      }
    </React.Fragment>
  );
};

ElectionResultsNotificationContent.propTypes = {
  data: types.object
};

export default ElectionResultsNotificationContent;
