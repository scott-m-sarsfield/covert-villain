import React from 'react';
import types from 'prop-types';
import { useSelector } from 'react-redux';
import find from 'lodash/find';
import styled from 'styled-components';
import Instructions from '../shared/instructions';
import { PartyAwareName } from '../shared/atoms';
import useTheme from '../shared/use_theme';

const Party = styled.h2`
  font-size: 30px;
  line-height: 40px;
  text-align: center;
  text-transform: capitalize;
  margin: 0;
  padding: 0;
  
  ${({ party }) => party === 'goodParty' ? `
      color: #74b5d5;
    ` : `
      color: #c84e4e;
    `}
`;

const InvestigationNotificationContent = ({ data }) => {
  const { user, data: game } = useSelector((state) => state.game);
  const theme = useTheme();
  const { president, player: playerUuid } = data;

  const player = find(game.players, { uuid: playerUuid });

  const isPresident = user.uuid === president;
  return isPresident ? (
    <>
      <Instructions>
        <PartyAwareName uuid={playerUuid} renderName={(name) => `${name}'s`}/> Party:
      </Instructions>
      <Party party={player.party}>{theme[player.party]}</Party>
    </>
  ) : (
    <>
      <Instructions>
        <PartyAwareName uuid={president} />
        <br />
        investigated
        <br />
        <PartyAwareName uuid={playerUuid} />
      </Instructions>
    </>
  );
};

InvestigationNotificationContent.propTypes = {
  data: types.object
};

export default InvestigationNotificationContent;
