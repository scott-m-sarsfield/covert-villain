import React from 'react';
import types from 'prop-types';
import { useSelector } from 'react-redux';
import find from 'lodash/find';
import { css, cx } from '@emotion/css';
import Instructions from '../shared/instructions';
import { PartyAwareName } from '../shared/atoms';
import useTheme from '../shared/use_theme';
import { getThemeColor, getThemeText } from '../../theme';

const styles = {
  party: css`
    font-size: 30px;
    line-height: 40px;
    text-align: center;
    text-transform: capitalize;
    margin: 0;
    padding: 0;
`,
  partyColor: (color) => css`
    color: ${color}
  `
};

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
      <h2 className={cx(
        styles.party, {
          [styles.partyColor(getThemeColor(theme, 'good'))]: player.party === 'goodParty',
          [styles.partyColor(getThemeColor(theme, 'evil'))]: player.party !== 'goodParty'
        })}>
        {getThemeText(theme, player.party)}
      </h2>
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
