import React from 'react';
import get from 'lodash/get';
import find from 'lodash/find';
import { useDispatch, useSelector } from 'react-redux';
import SubmitButton from '../shared/submit_button';
import { goToLobby, leaveGame } from '../../game_slice';
import Button from '../shared/button';
import { PlayerTable } from '../shared/player_table';
import Instructions, { Details } from '../shared/instructions';
import { PartyText } from '../shared/atoms';
import { Layout, WrappedScoreHud } from '../shared/layout';
import LobbyPage from './lobby_page';

const GameOverPage = () => {
  const { data: game } = useSelector((state) => state.game);
  const players = get(game, 'players', []);

  const mussolini = find(players, { role: 'mussolini' });

  const liberalPoliciesEnacted = game.cards.liberal.length >= 5;
  const mussoliniKilled = !get(find(game.players, { role: 'mussolini' }), 'alive');
  const fascistPoliciesEnacted = game.cards.fascist.length >= 6;
  const mussoliniElected = game.cards.fascist.length >= 3 && game.chancellor === mussolini.uuid;

  const dispatch = useDispatch();

  const onLeave = () => dispatch(leaveGame());
  const onLobby = () => dispatch(goToLobby());

  return (
    <Layout withSubmit>
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

      <SubmitButton onClick={onLobby}>Go to lobby</SubmitButton>
    </Layout>
  );
};

const GameOverAndLobbyPage = () => {
  const { user, data: game } = useSelector((state) => state.game);
  const players = get(game, 'players', []);

  const player = find(players, { uuid: user.uuid });

  if (player.lobby) {
    return <LobbyPage />;
  }
  return (<GameOverPage />);
};

export default GameOverAndLobbyPage;
