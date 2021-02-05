import React from 'react';
import types from 'prop-types';
import Instructions from '../shared/instructions';
import { PartyText } from '../shared/atoms';
import useTheme from '../shared/use_theme';

const PolicyEnactedNotificationContent = ({ data }) => {
  const theme = useTheme();

  const { card } = data;

  const evil = card < 11;

  return (
    <React.Fragment>
      <Instructions>
        {evil && <PartyText party="evilParty">{theme.evilParty} Policy</PartyText>}
        {!evil && <PartyText party="goodParty">{theme.goodParty} Policy</PartyText>}
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
