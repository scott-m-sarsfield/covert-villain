import React from 'react';
import get from 'lodash/get';
import find from 'lodash/find';
import { useDispatch, useSelector } from 'react-redux';
import SubmitButton from '../shared/submit_button';
import { goToLobby } from '../../store/game_slice';
import { PlayerRole, PlayerTable } from '../shared/player_table';
import Instructions, { Details } from '../shared/instructions';
import { PartyText } from '../shared/atoms';
import { Layout, WrappedScoreHud } from '../shared/layout';
import LobbyPage from './lobby_page';
import useTheme from '../shared/use_theme';
import { getThemeText } from '../../theme';

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

  const onLobby = () => dispatch(goToLobby());

  return (
    <Layout withSubmit>
      <WrappedScoreHud />

      <Instructions>
        {
          (goodPoliciesEnacted || villainKilled) && (
            <PartyText party="goodParty">{getThemeText(theme, 'goodRole')}s Win!</PartyText>
          )
        }
        {
          (evilPoliciesEnacted || villainElected) && (
            <PartyText party="evilParty">{getThemeText(theme, 'evilRole')}s Win!</PartyText>
          )
        }
      </Instructions>

      <Details>
        {
          goodPoliciesEnacted && <span>5 {getThemeText(theme, 'goodParty')} policies enacted</span>
        }
        {
          villainKilled && <span>{getThemeText(theme, 'villain')} killed</span>
        }
        {
          evilPoliciesEnacted && <span>6 {getThemeText(theme, 'evilParty')} policies enacted</span>
        }
        {
          villainElected && <span>{getThemeText(theme, 'villain')} elected {getThemeText(theme, 'chancellor')}</span>
        }
      </Details>

      <PlayerTable players={players} renderRightContent={({ role }) => role && (
        <PlayerRole>{`${getThemeText(theme, role)}`}</PlayerRole>
      )}/>

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
