import React from 'react';
import types from 'prop-types';
import { useSelector } from 'react-redux';
import get from 'lodash/get';
import Instructions from '../shared/instructions';
import { PartyText } from '../shared/atoms';
import themes from '../../theme';

const PolicyEnactedNotificationContent = ({ data }) => { // data prop
  const { data: game } = useSelector((state) => state.game);
  const currentTheme = useSelector((state) => get(state.theme, 'current')) || 'elusiveEmperor';

  const { card } = data;

  const evil = card < 11;

  // eslint-disable-next-line no-console
  console.log(game);

  return (
    <React.Fragment>
      <Instructions>
        {evil && <PartyText party="evil">{themes[currentTheme].evilParty} Policy</PartyText>}
        {!evil && <PartyText party="good">{themes[currentTheme].goodParty} Policy</PartyText>}
        <br />
        Enacted!
      </Instructions>
    </React.Fragment>
  );
};

PolicyEnactedNotificationContent.propTypes = {
  data: types.object
};

export default PolicyEnactedNotificationContent;
