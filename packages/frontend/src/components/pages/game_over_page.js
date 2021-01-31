import React from 'react';
import get from 'lodash/get';
import find from 'lodash/find';
import { useDispatch, useSelector } from 'react-redux';
import SubmitButton from '../shared/submit_button';
import { leaveGame, startGame } from '../../game_slice';
import Button from '../shared/button';
import { PlayerTable } from '../shared/player_table';
import Instructions, { Details } from '../shared/instructions';
import { PartyText} from '../shared/atoms';
import {Layout, WrappedScoreHud} from '../shared/layout';

const GameOverPage = () => {
  const { user, data: game } = useSelector((state) => state.game);
  const players = get(game, 'players', []);
  const isHost = user.uuid === get(game, 'players[0].uuid');

  const mussolini = find(players, { role: 'mussolini' });

  const liberalPoliciesEnacted = game.cards.liberal.length >= 5;
  const mussoliniKilled = !find(game.players, { role: 'mussolini' }).alive;
  const fascistPoliciesEnacted = game.cards.fascist.length >= 6;
  const mussoliniElected = game.cards.fascist.length >= 3 && game.chancellor === mussolini.uuid;

  const dispatch = useDispatch();

  const onLeave = () => dispatch(leaveGame());
  const onStart = () => dispatch(startGame());

  return (
    <Layout withSubmit={isHost}>
      <WrappedScoreHud />
      <Instructions>
        {
          (liberalPoliciesEnacted || mussoliniKilled) && (
            <PartyText party="liberal">Liberals</PartyText>
          )
        }
        {
          (fascistPoliciesEnacted || mussoliniElected) && (
            <PartyText party="fascist">Fascists</PartyText>
          )
        }

        &nbsp;Win!
      </Instructions>
      <Details>
        {
          liberalPoliciesEnacted && <span>5 liberal policies enacted</span>
        }
        {
          mussoliniKilled && <span>Mussolini killed</span>
        }
        {
          fascistPoliciesEnacted && <span>6 fascist policies enacted</span>
        }
        {
          mussoliniElected && <span>Mussolini elected Chancellor</span>
        }
      </Details>
      <PlayerTable players={players} />
      <Button onClick={onLeave}>Leave</Button>
      {
        isHost && (
          <SubmitButton onClick={onStart} disabled={players.length < 5}>New Game</SubmitButton>
        )
      }
    </Layout>
  );
};

export default GameOverPage;
