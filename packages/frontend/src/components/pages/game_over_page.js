import React from 'react';
import get from 'lodash/get';
import find from 'lodash/find';
import { useDispatch, useSelector } from 'react-redux';
import SubmitButton from '../shared/submit_button';
import { goToLobby, leaveGame } from '../../store/game_slice';
import Button from '../shared/button';
import { PlayerRole, PlayerTable } from '../shared/player_table';
import Instructions, { Details } from '../shared/instructions';
import { PartyText } from '../shared/atoms';
import { Layout, WrappedScoreHud } from '../shared/layout';
import LobbyPage from './lobby_page';
import useTheme from '../shared/use_theme';

const GameOverPage = () => {
  const { data: game } = useSelector((state) => state.game);
  const theme = useTheme();
  const players = get(game, 'players', []);

  const villain = find(players, { role: 'villain' });

  const goodPoliciesEnacted = game.cards.goodParty.length >= 5;
  const villainKilled = !get(find(game.players, { role: 'villain' }), 'alive');
  const evilPoliciesEnacted = game.cards.evilParty.length >= 6;
  const villainElected = game.cards.evilParty.length >= 3 && game.chancellor === villain.uuid;

  const dispatch = useDispatch();

  const onLeave = () => dispatch(leaveGame());
  const onLobby = () => dispatch(goToLobby());

  return (
    <Layout withSubmit>
      <WrappedScoreHud />
      <Instructions>
        {
          (goodPoliciesEnacted || villainKilled) && (
            <PartyText party="good">{theme.goodRole}s Win!</PartyText>
          )
        }
        {
          (evilPoliciesEnacted || villainElected) && (
            <PartyText party="evil">{theme.evilRole}s Win!</PartyText>
          )
        }
      </Instructions>
      <Details>
        {
          goodPoliciesEnacted && <span>5 {theme.goodParty} policies enacted</span>
        }
        {
          villainKilled && <span>{theme.villain} killed</span>
        }
        {
          evilPoliciesEnacted && <span>6 {theme.evilParty} policies enacted</span>
        }
        {
          villainElected && <span>{theme.villain} elected {theme.chancellor}</span>
        }
      </Details>
      <PlayerTable players={players} renderRightContent={({ role }) => role && (
        <PlayerRole>{`${theme[role]}`}</PlayerRole>
      )}/>
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
